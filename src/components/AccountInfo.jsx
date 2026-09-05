import React, { useState } from 'react';
import styled from '@emotion/styled';

// 1. 계좌 데이터 (본인 정보에 맞게 수정)
const accountData = [
  {
    host: '신랑측',
    accountInfo: [
      {
        name: '오세민',
        relation: '신랑',
        bank: '하나은행',
        account: '704-910509-15407',
      },
      {
        name: '오상환',
        relation: '신랑 아버지',
        bank: '수협은행',
        account: '2020-5130-8348',
      },
      {
        name: '김계현',
        relation: '신랑 어머니',
        bank: '경남은행',
        account: '511-22-0355008',
      },
    ],
  },
  {
    host: '신부측',
    accountInfo: [
      {
        name: '이지현',
        relation: '신부',
        bank: '카카오뱅크',
        account: '1111-11-2345678',
      },
      {
        name: '이동술',
        relation: '신부 아버지',
        bank: '은행명',
        account: '계좌번호',
      },
      {
        name: '이귀자',
        relation: '신부 어머니',
        bank: '은행명',
        account: '계좌번호',
      },
    ],
  },
];

// 2. 개별 계좌 항목 컴포넌트
const AccountItem = ({ name, relation, bank, account }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${bank} ${account}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ItemWrapper>
      <InfoBox>
        <RelationText>{relation}</RelationText>
        <NameText>{name}</NameText>
        <AccountDetails>
          {bank} {account}
        </AccountDetails>
      </InfoBox>
      <ButtonArea>
        <CopyButton onClick={handleCopy}>
          {copied ? '복사됨!' : '계좌번호 복사'}
        </CopyButton>
      </ButtonArea>
    </ItemWrapper>
  );
};

// 3. 아코디언 컴포넌트
const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionWrapper>
      <AccordionHeader onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        <ArrowIcon isOpen={isOpen}>▼</ArrowIcon>
      </AccordionHeader>
      {isOpen && <AccordionContent>{children}</AccordionContent>}
    </AccordionWrapper>
  );
};

// 4. 메인 AccountInfo 컴포넌트
export default function AccountInfo() {
  return (
    <Container>
      <Title>마음 전하실 곳</Title>
      {accountData.map((hostGroup) => (
        <Accordion key={hostGroup.host} title={hostGroup.host}>
          {hostGroup.accountInfo.map((account) => (
            <AccountItem
              key={account.name}
              name={account.name}
              relation={account.relation}
              bank={account.bank}
              account={account.account}
            />
          ))}
        </Accordion>
      ))}
    </Container>
  );
}

// 5. CSS 스타일 정의
const Container = styled.div`
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #333;
`;

const AccordionWrapper = styled.div`
  margin-bottom: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
`;

const AccordionHeader = styled.button`
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8fafc;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
`;

const ArrowIcon = styled.span`
  font-size: 0.8rem;
  transition: transform 0.2s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const AccordionContent = styled.div`
  padding: 12px 16px;
  border-top: 1px solid #e2e8f0;
`;

const ItemWrapper = styled.div`
  padding: 12px 0;
  border-bottom: 1px dashed #e2e8f0;
  &:last-child {
    border-bottom: none;
  }
`;

const InfoBox = styled.div`
  margin-bottom: 8px;
`;

const RelationText = styled.span`
  font-size: 0.85rem;
  color: #64748b;
  margin-right: 6px;
`;

const NameText = styled.span`
  font-weight: 600;
  font-size: 1rem;
  color: #0f172a;
`;

const AccountDetails = styled.div`
  margin-top: 4px;
  font-size: 0.95rem;
  color: #334155;
`;

const ButtonArea = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const CopyButton = styled.button`
  padding: 6px 12px;
  font-size: 0.8rem;
  border: 1px solid #cbd5e1;
  background-color: #f1f5f9;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e2e8f0;
  }
`;