import { useState, useEffect } from 'react';

interface PasswordProtectProps {
  children: React.ReactNode;
  correctPassword: string;
}

const wrongMessages = [
  "Nope. That's not it.",
  "Close? Probably not.",
  "The lock remains unimpressed.",
  "Try again. I believe in you.",
  "Hmm. Not quite.",
  "That password is living in your imagination.",
];

export const PasswordProtect: React.FC<PasswordProtectProps> = ({ 
  children, 
  correctPassword 
}) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [splashFading, setSplashFading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [shake, setShake] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);

  useEffect(() => {
    if (shake) {
      const t = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(t);
    }
  }, [shake]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setErrorMsg('');
      setShowSplash(true);
      setTimeout(() => setSplashFading(true), 1600);
      setTimeout(() => {
        setIsAuthenticated(true);
        setShowSplash(false);
        setSplashFading(false);
      }, 2400);
    } else {
      const idx = wrongCount % wrongMessages.length;
      setErrorMsg(wrongMessages[idx]);
      setWrongCount((c) => c + 1);
      setShake(true);
      setPassword('');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  if (showSplash) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{
          background: '#1a1815',
          opacity: splashFading ? 0 : 1,
          transition: 'opacity 0.8s ease',
        }}
      >
        <style>{`
          @keyframes unlockPop {
            0%   { transform: scale(0.4) rotate(-15deg); opacity: 0; }
            60%  { transform: scale(1.15) rotate(4deg); opacity: 1; }
            80%  { transform: scale(0.95) rotate(-2deg); }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          @keyframes textRise {
            0%   { transform: translateY(18px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          @keyframes dotPulse {
            0%, 100% { opacity: 0.3; transform: scale(0.8); }
            50%       { opacity: 1;   transform: scale(1.1); }
          }
          .unlock-icon  { animation: unlockPop  0.6s cubic-bezier(0.34,1.56,0.64,1) forwards; }
          .unlock-title { animation: textRise   0.5s ease 0.5s both; }
          .unlock-sub   { animation: textRise   0.5s ease 0.75s both; }
          .dot-1 { animation: dotPulse 1s ease 1s infinite; }
          .dot-2 { animation: dotPulse 1s ease 1.2s infinite; }
          .dot-3 { animation: dotPulse 1s ease 1.4s infinite; }
        `}</style>
        <div className="unlock-icon text-[72px] mb-6">🔓</div>
        <h2
          className="unlock-title text-white text-[28px] sm:text-[34px] font-bold tracking-tight mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          You're in.
        </h2>
        <p className="unlock-sub text-white/50 text-[15px] mb-8">
          Opening the Prism case study…
        </p>
        <div className="flex items-center gap-2">
          <span className="dot-1 w-2 h-2 rounded-full bg-white/40 block" />
          <span className="dot-2 w-2 h-2 rounded-full bg-white/40 block" />
          <span className="dot-3 w-2 h-2 rounded-full bg-white/40 block" />
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          15%      { transform: translateX(-7px); }
          30%      { transform: translateX(7px); }
          45%      { transform: translateX(-5px); }
          60%      { transform: translateX(5px); }
          75%      { transform: translateX(-2px); }
          90%      { transform: translateX(2px); }
        }
        @keyframes errorSlide {
          0%   { opacity: 0; transform: translateY(-6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .shake-form { animation: shake 0.45s ease; }
        .error-in   { animation: errorSlide 0.25s ease both; }
      `}</style>

      <div className="min-h-screen flex items-center justify-center px-5 sm:px-8 md:px-10">
        <div className="max-w-md w-full">
          <div
            className={`bg-white/90 backdrop-blur-sm border rounded-2xl p-8 shadow-xl transition-colors duration-300 ${
              errorMsg ? 'border-red-300' : 'border-black/10'
            } ${shake ? 'shake-form' : ''}`}
          >
            <div className="text-center mb-8">
              <div
                className="text-[40px] mb-4 transition-all duration-300"
                style={{ filter: errorMsg ? 'grayscale(0) drop-shadow(0 0 8px rgba(239,68,68,0.4))' : 'none' }}
              >
                {errorMsg ? '🔐' : '🔒'}
              </div>
              <h1
                className="text-[26px] font-bold mb-3 tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                This one's for the right eyes only.
              </h1>
              <p className="text-[15px] text-black/55 leading-relaxed">
                The Prism case study is password protected — it contains details about internal
                design process and systems. Reach out if you'd like access.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-[13px] font-medium text-black/70 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (errorMsg) setErrorMsg(''); }}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errorMsg
                      ? 'border-red-300 focus:ring-red-200 bg-red-50/40'
                      : 'border-black/20 focus:ring-black/20 focus:border-black/40'
                  }`}
                  placeholder="Enter password"
                  required
                />
              </div>

              {errorMsg && (
                <div className="error-in flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  <span className="text-[16px] mt-0.5 flex-shrink-0">🙅</span>
                  <p className="text-[13px] text-red-700 font-medium">{errorMsg}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-black/80 active:scale-[0.98] transition-all font-medium text-[14px]"
              >
                Access Case Study
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-black/10 text-center">
              <p className="text-[12px] text-black/40">
                Don't have it?{' '}
                <a href="/#contact" className="underline underline-offset-2 hover:text-black/70 transition-colors">
                  Drop me a message
                </a>{' '}
                and I'll send it over.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
