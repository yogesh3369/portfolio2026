import { PasswordProtect } from './PasswordProtect';
import { PrismCaseStudy } from './PrismCaseStudy';

export const ProtectedPrismCaseStudy = () => {
  // You can change this password to whatever you prefer
  const CASE_STUDY_PASSWORD = "prism2024";

  return (
    <PasswordProtect correctPassword={CASE_STUDY_PASSWORD}>
      <PrismCaseStudy />
    </PasswordProtect>
  );
};
