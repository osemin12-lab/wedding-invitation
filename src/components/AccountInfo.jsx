import { useState } from 'react';
import useCopyClipboard from '../hooks/useCopyClipboard';
import '../styles/AccountInfo.css';

function AccountInfo() {
  const groomCopy = useCopyClipboard();
  const brideCopy = useCopyClipboard();

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const showCopyToast = (text) => {
    setToastMessage(text);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const groomAccount = {
    name: "오세민",
    bank: "하나은행",
    number: "70491050915407"
  };

  const brideAccount = {
    name: "이지현",
    bank: "카카오뱅크",
    number: "11111111111111"
  };

  return (
    <section className="account-info">
      {/* ✅ 복사 완료 토스트 메시지 */}
      {showToast && <div className="toast">{toastMessage}</div>}

      <h2 className="account-title">마음을 전하는 곳</h2>

      <div className="account-line">
        <span className="account-label">신랑측 계좌번호</span>
        <span className="account-text">
          {groomAccount.name} {groomAccount.bank} {groomAccount.number}
        </span>
        <button
          className="copy-button"
          onClick={() => {
            groomCopy.copy(groomAccount.number);
            showCopyToast('계좌번호가 복사되었습니다.');
          }}
        >
          📋
        </button>
      </div>

      <div className="account-line">
        <span className="account-label">신부측 계좌번호</span>
        <span className="account-text">
          {brideAccount.name} {brideAccount.bank} {brideAccount.number}
        </span>
        <button
          className="copy-button"
          onClick={() => {
            brideCopy.copy(brideAccount.number);
            showCopyToast('계좌번호가 복사되었습니다.');
          }}
        >
          📋
        </button>
      </div>
    </section>
  );
}

export default AccountInfo;
