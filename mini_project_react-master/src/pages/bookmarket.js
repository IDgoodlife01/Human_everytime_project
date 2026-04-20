import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
  useMemo,
} from "react";
import AxiosApi from "../api/AxiosApi";
import { UserContext } from "../context/UserStore";
import "../style/BookMarket.css";

const BookMarket = () => {
  // 1. 유저 정보 (UserStore 방식 유지)
  const { loginUser } = useContext(UserContext);
  const currentUserId = loginUser?.userId ?? loginUser?.id;

  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("전체");
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    origPrice: "",
    cond: "S",
    desc: "",
    img: null, // 여기에 Base64 문자열이 저장됨
  });

  // 헬퍼: Base64를 백엔드가 원하는 Byte Array로 변환
  const base64ToByteArray = (base64String) => {
    if (!base64String || !base64String.includes(",")) return null;
    const realData = base64String.split(",")[1];
    const raw = window.atob(realData);
    const uInt8Array = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return Array.from(uInt8Array);
  };

  // 2. 데이터 매핑 로직 (서버 응답 구조 반영)
  const processBookData = useCallback((data) => {
    const rawList = Array.isArray(data) ? data : [];
    return rawList.map((item) => {
      let imageSource = null;

      // 백엔드에서 오는 데이터가 이미 Base64 문자열이므로
      // 앞에 브라우저가 인식할 수 있는 헤더만 붙여주면 됩니다.
      if (item.imageData) {
        // 만약 데이터에 이미 'data:image'가 포함되어 있다면 그대로 쓰고,
        // 아니라면 헤더를 붙여줍니다.
        imageSource = item.imageData.startsWith("data:image")
          ? item.imageData
          : `data:image/jpeg;base64,${item.imageData}`;
      }

      return {
        bookId: item.bookId,
        title: item.title,
        author: item.author,
        price: item.price,
        img: imageSource, // 이제 이 값이 <img> 태그의 src로 들어갑니다.
        desc: item.description,
        cond: item.bookCondition || "A",
        sold: item.status === "SOLD" || item.status === "판매완료",
        memberId: item.userId,
        memberNickname: item.sellerName,
        regDate: item.createdAt,
      };
    });
  }, []);

  const loadMarketList = async () => {
    setLoading(true);
    try {
      const response = await AxiosApi.getBookList();
      // 서버 응답의 data.data 구조를 사용
      if (response.data && response.data.success) {
        const processed = processBookData(response.data.data);
        const sorted = processed.sort((a, b) => {
                  return new Date(b.regDate) - new Date(a.regDate); // 내림차순 (최신순)
                });
                setBooks(sorted);

      }
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMarketList();
  }, [processBookData]);

  // 이미지 압축 로직
  const compressImage = (base64Str) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 600;
        let width = img.width;
        let height = img.height;
        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.6));
      };
    });
  };

  const onFileChange = useCallback(async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        setFilePreview(reader.result);
        const compressed = await compressImage(reader.result);
        setFormData((prev) => ({ ...prev, img: compressed }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // 3. 폼 제출 로직 (이미지 데이터 전송 포함)
  const handleFormSubmit = async () => {
    if (!currentUserId) return alert("로그인이 필요한 서비스입니다.");
    if (!formData.title || !formData.author || !formData.price)
      return alert("필수 항목을 입력하세요.");

    // 백엔드 BookReqDto의 필드명과 타입에 완벽히 맞춥니다.
    const payload = {
      title: formData.title,
      author: formData.author,
      description: formData.desc,
      bookCondition: formData.cond,
      price: Number(formData.price),
      // 중요 1: 필드명을 base64Image로 변경
      // 중요 2: base64ToByteArray를 쓰지 말고, 가공 전의 formData.img(Base64)를 그대로 보냅니다.
      // 단, 'data:image/jpeg;base64,' 부분은 잘라내고 순수 데이터만 보냅니다.
      base64Image: formData.img ? formData.img.split(",")[1] : null,
    };

    setLoading(true);
    try {
      if (isEditMode) {
        await AxiosApi.updateBook(selectedBook.bookId, currentUserId, payload);
      } else {
        // AxiosApi.js에 정의된 대로 (userId, body) 형태로 호출
        await AxiosApi.writeBook(currentUserId, payload);
      }

      alert("등록되었습니다!");
      resetAndClose();
      await loadMarketList();
      setSelectedBook(null);
    } catch (err) {
      console.error("전송 에러:", err);
      alert("전송 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // --- 기타 핸들러 (쪽지, 완료, 삭제 등) 동일 유지 ---
  const handleSendNote = async () => {
    if (!currentUserId) return alert("로그인이 필요합니다.");
    if (!noteContent.trim()) return alert("내용을 입력하세요.");

    // 1. 백엔드 MessageReqDto { receiverId, content } 구조에 딱 맞게 준비
    const messageData = {
      receiverId: selectedBook.memberId, // 받는 사람 ID
      content: noteContent, // 내용
    };

    try {
      setLoading(true);
      // 2. [중요] AxiosApi.sendMessage(senderId, messageData) 순서대로 전달!
      const response = await AxiosApi.sendMessage(currentUserId, messageData);

      if (response.data === true || response.data.success) {
        alert("쪽지가 성공적으로 발송되었습니다.");
        setNoteContent("");
        setIsNoteModalOpen(false);
      }
    } catch (error) {
      // 400 에러가 난다면 여기서 상세 내용을 볼 수 있습니다.
      console.error("전송 에러:", error.response?.data);
      alert("발송 실패: 데이터를 확인해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteStatus = async (id) => {
    if (!window.confirm("판매완료 처리하시겠습니까?")) return;
    try {
      await AxiosApi.completeBook(id, currentUserId);
      await loadMarketList();
      setSelectedBook(null);
    } catch (e) {
      alert("상태 변경 실패");
    }
  };

  const handleDeleteTrigger = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await AxiosApi.deleteBook(selectedBook.bookId, currentUserId);
      await loadMarketList();
      setSelectedBook(null);
    } catch (e) {
      alert("삭제 실패");
    }
  };

  const resetAndClose = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setFilePreview(null);
    setFormData({
      title: "",
      author: "",
      price: "",
      cond: "S",
      desc: "",
      img: null,
    });
  };

  const openUpdateView = () => {
    setIsEditMode(true);
    setIsModalOpen(true);
    setFormData({
      title: selectedBook.title,
      author: selectedBook.author,
      price: selectedBook.price,
      cond: selectedBook.cond ? selectedBook.cond.charAt(0) : "S",
      desc: selectedBook.desc,
      img: selectedBook.img,
    });
    setFilePreview(selectedBook.img);
  };

  const filteredList = useMemo(() => {
    return books.filter((b) => {
      if (filter === "판매중") return !b.sold;
      if (filter === "판매완료") return b.sold;
      return true;
    });
  }, [books, filter]);

  return (
    <div className="book-market-root">
      {/* --- JSX 구조 시작 --- */}
      <div className="market-top-header">
        <div className="text-zone">
          <h1 className="market-h1">중고책 마켓</h1>
          <div className="market-stats">
            <div
              className={`stat-pill ${filter === "전체" ? "active" : ""}`}
              onClick={() => setFilter("전체")}
            >
              <span className="lab">전체</span>
              <span className="num">{books.length}</span>
            </div>
          </div>
        </div>
        <div className="util-zone">
          <button
            className="btn-register-main"
            onClick={() => {
              setIsEditMode(false);
              setIsModalOpen(true);
            }}
          >
            + 내 책 판매하기
          </button>
        </div>
      </div>

      <div className={`market-grid-layout ${selectedBook ? "has-aside" : ""}`}>
        <div className="table-wrapper-ui">
          <table className="market-main-table">
            <thead>
              <tr>
                <th className="th-info">도서 정보</th>
                <th className="th-auth">저자</th>
                <th className="th-cond">상태</th>
                <th className="th-price">가격</th>
                <th className="th-owner">판매자</th>
              </tr>
            </thead>
            <tbody>
              {loading && books.length === 0 ? (
                <tr>
                  <td colSpan="5" className="td-loading">
                    로딩 중...
                  </td>
                </tr>
              ) : filteredList.length === 0 ? (
                <tr>
                  <td colSpan="5" className="td-loading">
                    등록된 상품이 없습니다.
                  </td>
                </tr>
              ) : (
                filteredList.map((item) => (
                  <tr
                    key={item.bookId}
                    className={`book-row-item ${selectedBook?.bookId === item.bookId ? "picked" : ""} ${item.sold ? "dim" : ""}`}
                    onClick={() => setSelectedBook(item)}
                  >
                    <td>
                      <div className="td-book-profile">
                        <div className="thumb-container-ui">
                          {item.img ? (
                            <img
                              src={item.img}
                              className="img-fit"
                              alt="book"
                            />
                          ) : (
                            <div className="no-img-box">📚</div>
                          )}
                        </div>
                        <div className="title-text-ui">{item.title}</div>
                      </div>
                    </td>
                    <td>
                      <span className="td-sub-text">{item.author}</span>
                    </td>
                    <td>
                      <span
                        className={`badge-ui ${item.sold ? "sold" : `lvl-${item.cond.charAt(0).toLowerCase()}`}`}
                      >
                        {item.sold ? "판매완료" : `${item.cond.charAt(0)}등급`}
                      </span>
                    </td>
                    <td>
                      <div className="td-price-text">
                        {item.price?.toLocaleString()}원
                      </div>
                    </td>
                    <td>
                      <span className="td-sub-text">{item.memberNickname}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {selectedBook && (
          <aside className="book-detail-aside">
            <div className="aside-head-ui">
              <span className="aside-h-label">상세 정보</span>
              <button
                className="aside-x-btn"
                onClick={() => setSelectedBook(null)}
              >
                &times;
              </button>
            </div>
            <div className="aside-scroll-box">
              <div className="aside-img-frame">
                {selectedBook.img ? (
                  <img
                    src={selectedBook.img}
                    className="aside-real-img"
                    alt="cover"
                  />
                ) : (
                  <div className="aside-empty-placeholder">No Image</div>
                )}
              </div>
              <div className="aside-content-meta">
                <h2 className="meta-title-h2">{selectedBook.title}</h2>
                <p className="meta-author-p">{selectedBook.author}</p>
                <div className="meta-price-box">
                  <span
                    className={`price-final ${selectedBook.sold ? "is-sold" : ""}`}
                  >
                    {selectedBook.price?.toLocaleString()}원
                  </span>
                  {selectedBook.sold && (
                    <span className="sold-out-chip">판매완료</span>
                  )}
                </div>
                <div className="meta-hr"></div>
                <div className="meta-spec-table">
                  <div className="spec-item">
                    <span className="s-lab">도서 등급</span>
                    <span className="s-val">{selectedBook.cond}등급</span>
                  </div>
                </div>
                <div className="meta-desc-section">
                  <h4 className="desc-h4-ui">상품 상세 설명</h4>
                  <div className="desc-text-area-ui">
                    {selectedBook.desc || "내용이 없습니다."}
                  </div>
                </div>
              </div>
            </div>
            <div className="aside-footer-actions-fixed">
              <div className="btn-row-flex">
                <button
                  className="btn-send-message"
                  onClick={() => setIsNoteModalOpen(true)}
                >
                  쪽지 보내기
                </button>
                {selectedBook.memberId === currentUserId && (
                  <div className="owner-tools">
                    <button
                      className="tool-btn edit"
                      onClick={openUpdateView}
                      disabled={selectedBook.sold}
                    >
                      수정
                    </button>
                    <button
                      className="tool-btn del"
                      onClick={handleDeleteTrigger}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
              {selectedBook.memberId === currentUserId && (
                <button
                  className={`btn-state-final ${selectedBook.sold ? "disabled" : ""}`}
                  onClick={() =>
                    !selectedBook.sold &&
                    handleCompleteStatus(selectedBook.bookId)
                  }
                  disabled={selectedBook.sold}
                >
                  {selectedBook.sold ? "거래 완료" : "판매완료 처리하기"}
                </button>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* 모달 부분들은 구조 동일하므로 생략 (기존 코드의 모달 부분을 그대로 사용하세요) */}
      {isModalOpen && (
        <div className="modal-dim-ui" onClick={resetAndClose}>
          <div
            className="modal-core form-type"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header-core">
              <h3>{isEditMode ? "상품 수정" : "상품 등록"}</h3>
              <button className="modal-close-icon" onClick={resetAndClose}>
                &times;
              </button>
            </div>
            <div className="modal-body-core has-y-scroll">
              <div className="img-upload-section">
                <label className="ui-label-bold">이미지</label>
                <div
                  className="img-drop-zone"
                  onClick={() => fileInputRef.current.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    accept="image/*"
                    onChange={onFileChange}
                  />
                  {filePreview ? (
                    <img
                      src={filePreview}
                      className="img-upload-preview"
                      alt="p"
                    />
                  ) : (
                    <div className="img-placeholder-ui">📸</div>
                  )}
                </div>
              </div>
              {/* 제목, 저자, 가격 등 입력 필드들... */}
              <div className="input-field-ui">
                <label className="ui-label-bold">제목 *</label>
                <input
                  type="text"
                  className="ui-input-main"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, title: e.target.value }))
                  }
                />
              </div>
              <div className="input-field-ui">
                <label className="ui-label-bold">저자 *</label>
                <input
                  type="text"
                  className="ui-input-main"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, author: e.target.value }))
                  }
                />
              </div>
              <div className="input-field-ui">
                <label className="ui-label-bold">가격 *</label>
                <input
                  type="number"
                  className="ui-input-main"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, price: e.target.value }))
                  }
                />
              </div>
              <div className="input-field-ui">
                <label className="ui-label-bold">상태</label>
                <div className="cond-selector-row">
                  {["S", "A", "B", "C"].map((l) => (
                    <button
                      key={l}
                      className={`cond-btn ${formData.cond === l ? "active" : ""}`}
                      onClick={() => setFormData((p) => ({ ...p, cond: l }))}
                    >
                      {l}등급
                    </button>
                  ))}
                </div>
              </div>
              <div className="input-field-ui">
                <label className="ui-label-bold">설명</label>
                <textarea
                  className="ui-textarea-tall"
                  value={formData.desc}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, desc: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="modal-footer-core">
              <button className="ui-btn-cancel" onClick={resetAndClose}>
                취소
              </button>
              <button
                className="ui-btn-submit-red"
                onClick={handleFormSubmit}
                disabled={loading}
              >
                {loading ? "전송 중..." : isEditMode ? "수정" : "등록"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 쪽지 모달 생략 (기존 코드 사용) */}
      {isNoteModalOpen && (
        <div className="modal-dim-ui" onClick={() => setIsNoteModalOpen(false)}>
          <div
            className="modal-core msg-type"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header-core">
              <h3>쪽지 보내기</h3>
            </div>
            <div className="modal-body-core">
              <div className="input-field-ui">
                <label>받는 사람</label>
                <input
                  type="text"
                  className="ui-input-ro"
                  value={selectedBook?.memberNickname}
                  readOnly
                />
              </div>
              <div className="input-field-ui">
                <label>메시지 내용</label>
                <textarea
                  className="ui-textarea-main"
                  placeholder="내용을 입력하세요."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer-core">
              <button
                className="ui-btn-cancel"
                onClick={() => setIsNoteModalOpen(false)}
              >
                닫기
              </button>
              <button
                className="ui-btn-send"
                onClick={handleSendNote}
                disabled={loading}
              >
                {loading ? "전송 중..." : "발송"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookMarket;
