import { PasswordProtect } from './PasswordProtect';
import { AirGVCaseStudy } from './AirGVCaseStudy';

export const ProtectedAirGVCaseStudy = () => {
  // Same password as Prism, so recruiters only need one
  const CASE_STUDY_PASSWORD = "prism2024";

  return (
    <PasswordProtect correctPassword={CASE_STUDY_PASSWORD} caseStudyName="Air Gift Voucher">
      <AirGVCaseStudy />
    </PasswordProtect>
  );
};
