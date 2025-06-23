import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Upload,
  BarChart3,
  Clock,
  Zap,
  Star,
  ArrowRight,
  FileText,
  Target,
  User,
  Sparkles,
  Brain,
  Rocket,
  Globe,
  Play
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type FloatingElementProps = {
  children: React.ReactNode;
  delay?: number;
};

const FloatingElement = ({ children, delay = 0 }: FloatingElementProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(2rem)',
        opacity: isVisible ? 1 : 0,
        transition: `all 1s ease-out ${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default function TestCheckerHome() {
  const [_, setScrollY] = useState(0);
const navigate=useNavigate();
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e1b4b 0%, #7c3aed 50%, #1e1b4b 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    },
    backgroundElements: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none'
    },
    bgOrb1: {
      position: 'absolute',
      top: '5rem',
      left: '5rem',
      width: '18rem',
      height: '18rem',
      background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
      borderRadius: '50%',
      animation: 'pulse 4s ease-in-out infinite'
    },
    bgOrb2: {
      position: 'absolute',
      top: '15rem',
      right: '5rem',
      width: '24rem',
      height: '24rem',
      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
      borderRadius: '50%',
      animation: 'pulse 4s ease-in-out infinite 2s'
    },
    bgOrb3: {
      position: 'absolute',
      bottom: '5rem',
      left: '33%',
      width: '20rem',
      height: '20rem',
      background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)',
      borderRadius: '50%',
      animation: 'pulse 4s ease-in-out infinite 4s'
    },
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(16px)',
      background: 'rgba(255, 255, 255, 0.05)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '1rem 0'
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    logoIcon: {
      position: 'relative',
      background: 'linear-gradient(45deg, #7c3aed, #ec4899)',
      padding: '0.75rem',
      borderRadius: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.3s ease',
      cursor: 'pointer'
    },
    logoText: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #a78bfa, #f472b6, #fb923c)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    logoSubtext: {
      color: '#d1d5db',
      fontSize: '0.875rem'
    },
    navButtons: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    loginBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      background: 'linear-gradient(45deg, #3b82f6, #7c3aed)',
      color: 'white',
      border: 'none',
      borderRadius: '9999px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '0.875rem'
    },
    signupBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      background: 'linear-gradient(45deg, #ec4899, #ef4444, #f97316)',
      color: 'white',
      border: 'none',
      borderRadius: '9999px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '0.875rem'
    },
    hero: {
      position: 'relative',
      zIndex: 10,
      padding: '5rem 1rem 8rem',
      textAlign: 'center',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'rgba(168, 85, 247, 0.2)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(168, 85, 247, 0.3)',
      borderRadius: '9999px',
      padding: '0.75rem 1.5rem',
      marginBottom: '2rem',
      color: '#c4b5fd'
    },
    heroTitle: {
      fontSize: 'clamp(2.5rem, 8vw, 5rem)',
      fontWeight: '900',
      marginBottom: '1.5rem',
      lineHeight: '1.1',
      color: 'white'
    },
    gradientText: {
      background: 'linear-gradient(45deg, #a78bfa, #f472b6, #fb923c)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      display: 'block'
    },
    heroDescription: {
      fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
      color: '#d1d5db',
      marginBottom: '3rem',
      maxWidth: '800px',
      margin: '0 auto 3rem',
      lineHeight: '1.6'
    },
    ctaButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '4rem'
    },
    primaryBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1rem 2rem',
      background: 'linear-gradient(45deg, #7c3aed, #ec4899, #f97316)',
      color: 'white',
      border: 'none',
      borderRadius: '9999px',
      fontWeight: 'bold',
      fontSize: '1.125rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    },
    secondaryBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1rem 2rem',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: 'white',
      borderRadius: '9999px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    playIcon: {
      width: '3rem',
      height: '3rem',
      background: 'linear-gradient(45deg, #3b82f6, #7c3aed)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.3s ease'
    },
    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem',
      maxWidth: '800px',
      margin: '0 auto'
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '1rem',
      padding: '1.5rem',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    statIcon: {
      width: '3rem',
      height: '3rem',
      margin: '0 auto 1rem',
      borderRadius: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.3s ease'
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: '900',
      marginBottom: '0.5rem'
    },
    statLabel: {
      color: '#d1d5db',
      fontWeight: '500'
    },
    features: {
      position: 'relative',
      zIndex: 10,
      padding: '5rem 1rem',
      background: 'rgba(0, 0, 0, 0.2)'
    },
    featuresContainer: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    featuresHeader: {
      textAlign: 'center',
      marginBottom: '4rem'
    },
    featuresTitle: {
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: '900',
      color: 'white',
      marginBottom: '1rem'
    },
    featuresSubtitle: {
      fontSize: '1.25rem',
      color: '#d1d5db',
      maxWidth: '600px',
      margin: '0 auto'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '2rem'
    },
    featureCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '1.5rem',
      padding: '2rem',
      transition: 'all 0.5s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    },
    featureIcon: {
      width: '4rem',
      height: '4rem',
      borderRadius: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1.5rem',
      transition: 'all 0.3s ease'
    },
    featureTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '1rem'
    },
    featureDescription: {
      color: '#d1d5db',
      marginBottom: '1.5rem',
      lineHeight: '1.6'
    },
    featureList: {
      marginBottom: '2rem'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: '#d1d5db',
      marginBottom: '0.75rem'
    },
    featureItemIcon: {
      width: '1.5rem',
      height: '1.5rem',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    featureBtn: {
      width: '100%',
      padding: '0.75rem',
      border: 'none',
      borderRadius: '0.75rem',
      color: 'white',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },
    cta: {
      position: 'relative',
      zIndex: 10,
      padding: '5rem 1rem'
    },
    ctaContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center'
    },
    ctaCard: {
      background: 'rgba(168, 85, 247, 0.2)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(168, 85, 247, 0.3)',
      borderRadius: '1.5rem',
      padding: '3rem'
    },
    stars: {
      display: 'flex',
      justifyContent: 'center',
      gap: '0.25rem',
      marginBottom: '1.5rem'
    },
    ctaTitle: {
      fontSize: '2.5rem',
      fontWeight: '900',
      color: 'white',
      marginBottom: '1rem'
    },
    ctaDescription: {
      fontSize: '1.25rem',
      color: '#d1d5db',
      marginBottom: '2rem'
    },
    ctaButtons2: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      justifyContent: 'center',
      alignItems: 'center'
    },
    footer: {
      position: 'relative',
      zIndex: 10,
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '2rem 1rem',
      textAlign: 'center'
    },
    footerText: {
      color: '#9ca3af'
    },
    footerHeart: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0.5rem',
      marginTop: '1rem',
      color: '#9ca3af'
    },
    heart: {
      width: '1rem',
      height: '1rem',
      background: 'linear-gradient(45deg, #ef4444, #ec4899)',
      borderRadius: '50%',
      animation: 'pulse 2s ease-in-out infinite'
    }
  };

  // Add CSS animations via style tag
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.05); }
      }
      
      .hover-scale:hover {
        transform: scale(1.05) !important;
      }
      
      .hover-rotate:hover {
        transform: scale(1.1) rotate(6deg) !important;
      }
      
      .hover-shadow:hover {
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
      }
      
      .hover-glow:hover {
        box-shadow: 0 0 20px rgba(168, 85, 247, 0.5) !important;
      }

      @media (min-width: 640px) {
        .sm-flex-row {
          flex-direction: row !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div style={styles.container as React.CSSProperties}>
      {/* Background Elements */}
      <div style={styles.backgroundElements as React.CSSProperties}>
        <div style={styles.bgOrb1 as React.CSSProperties}></div>
        <div style={styles.bgOrb2 as React.CSSProperties}></div>
        <div style={styles.bgOrb3 as React.CSSProperties}></div>
      </div>

      {/* Header */}
      <header style={styles.header as React.CSSProperties}>
        <div style={styles.headerContent}>
          <FloatingElement>
            <div style={styles.logo}>
              <div style={styles.logoIcon as React.CSSProperties} className="hover-scale">
                <Brain size={32} color="white" />
              </div>
              <div>
                <h1 style={styles.logoText}>TestChecker Pro</h1>
                <p style={styles.logoSubtext}>מערכת בדיקת מבחנים חכמה</p>
              </div>
            </div>
          </FloatingElement>

          <FloatingElement delay={200}>
            <div style={styles.navButtons}>
              <button onClick={()=>navigate(`/login`)} style={styles.loginBtn} className="hover-scale hover-glow">
                <User size={18} />
                התחברות
              </button>
              <button onClick={() => navigate(`/signup`)} style={styles.signupBtn} className="hover-scale hover-glow">
                <Rocket size={18} />
                הרשמה
              </button>
            </div>
          </FloatingElement>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero as React.CSSProperties}>
        <FloatingElement>
          <div style={styles.badge}>
            <Sparkles size={16} />
            <span>חדש! בדיקה בינה מלאכותית מתקדמת</span>
            <Zap size={16} style={{ color: '#fbbf24' }} />
          </div>
        </FloatingElement>

        <FloatingElement delay={200}>
          <h2 style={styles.heroTitle}>
            <span>מערכת בדיקת</span>
            <span style={styles.gradientText}>מבחנים עתידנית</span>
          </h2>
        </FloatingElement>

        <FloatingElement delay={400}>
          <p style={styles.heroDescription}>
            חוו מהפכה בבדיקת מבחנים עם 
            <span style={{ background: 'linear-gradient(45deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {' '}טכנולוגיית AI מתקדמת
            </span>
            . חסכו זמן, שפרו דיוק ותתמקדו במה שחשוב באמת - החינוך.
          </p>
        </FloatingElement>

        <FloatingElement delay={600}>
          <div style={styles.ctaButtons as React.CSSProperties} className="sm-flex-row">
            <button style={styles.primaryBtn as React.CSSProperties} className="hover-scale hover-glow">
              <Rocket size={20} />
              התחל עכשיו בחינם
              <ArrowRight size={20} />
            </button>
            
            <button style={styles.secondaryBtn} className="hover-scale">
              <div style={styles.playIcon} className="hover-rotate">
                <Play size={20} style={{ marginLeft: '2px' }} />
              </div>
              צפה בדמו חי
            </button>
          </div>
        </FloatingElement>

        {/* Stats */}
        <FloatingElement delay={800}>
          <div style={styles.stats}>
            {[
              { value: "50K+", label: "מבחנים נבדקו", icon: <FileText size={24} />, gradient: "linear-gradient(45deg, #60a5fa, #a78bfa)" },
              { value: "2K+", label: "מורים פעילים", icon: <User size={24} />, gradient: "linear-gradient(45deg, #a78bfa, #f472b6)" },
              { value: "99.8%", label: "דיוק בבדיקה", icon: <Target size={24} />, gradient: "linear-gradient(45deg, #f472b6, #fb923c)" },
              { value: "90%", label: "חיסכון בזמן", icon: <Clock size={24} />, gradient: "linear-gradient(45deg, #fb923c, #fbbf24)" },
            ].map(({ value, label, icon, gradient }, i) => (
              <div key={i} style={styles.statCard as React.CSSProperties} className="hover-scale hover-shadow">
                <div style={{ ...styles.statIcon, background: gradient }} className="hover-rotate">
                  {icon}
                </div>
                <div style={{ ...styles.statValue, background: gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {value}
                </div>
                <div style={styles.statLabel}>{label}</div>
              </div>
            ))}
          </div>
        </FloatingElement>
      </section>

      {/* Features Section */}
      <section style={styles.features as React.CSSProperties}>
        <div style={styles.featuresContainer}>
          <FloatingElement>
            <div style={styles.featuresHeader as React.CSSProperties}>
              <h3 style={styles.featuresTitle}>
                למה <span style={styles.gradientText}>TestChecker Pro</span>?
              </h3>
              <p style={styles.featuresSubtitle}>
                המערכת המתקדמת והחכמה ביותר לבדיקת מבחנים בעולם
              </p>
            </div>
          </FloatingElement>

          <div style={styles.featuresGrid}>
            {[
              {
                icon: <Upload size={32} />,
                title: "העלאה חכמה ומהירה",
                description: "העלו מבחנים בכל פורמט - תמונות, PDF, סריקות ואפילו כתב יד",
                features: ["זיהוי אוטומטי של פורמט", "עיבוד מקבילי מהיר", "תמיכה ב-50+ שפות"],
                gradient: "linear-gradient(45deg, #3b82f6, #7c3aed)",
                iconGradient: "linear-gradient(45deg, #3b82f6, #7c3aed)"
              },
              {
                icon: <Brain size={32} />,
                title: "בינה מלאכותית מתקדמת",
                description: "AI חכם שמבין הקשר, בודק לוגיקה ונותן משוב מותאם אישית",
                features: ["הבנת הקשר מתקדמת", "בדיקה סמנטית", "למידה מתמשכת"],
                gradient: "linear-gradient(45deg, #7c3aed, #ec4899)",
                iconGradient: "linear-gradient(45deg, #7c3aed, #ec4899)"
              },
              {
                icon: <BarChart3 size={32} />,
                title: "אנליטיקס מתקדם",
                description: "דוחות חכמים, תובנות עמוקות וניתוח טרנדים לשיפור מתמיד",
                features: ["דוחות אינטראקטיביים", "ניבוי ביצועים", "השוואות מתקדמות"],
                gradient: "linear-gradient(45deg, #ec4899, #f97316)",
                iconGradient: "linear-gradient(45deg, #ec4899, #f97316)"
              },
            ].map(({ icon, title, description, features, gradient, iconGradient }, i) => (
              <FloatingElement key={i} delay={i * 200}>
                <div style={styles.featureCard as React.CSSProperties} className="hover-scale hover-glow">
                  <div style={{ ...styles.featureIcon, background: iconGradient }} className="hover-rotate">
                    {icon}
                  </div>
                  
                  <h4 style={styles.featureTitle}>{title}</h4>
                  <p style={styles.featureDescription}>{description}</p>
                  
                  <div style={styles.featureList}>
                    {features.map((feature, idx) => (
                      <div key={idx} style={styles.featureItem}>
                        <div style={{ ...styles.featureItemIcon, background: iconGradient }}>
                          <CheckCircle size={16} color="white" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button style={{ ...styles.featureBtn, background: gradient }} className="hover-scale">
                    למד עוד
                    <ArrowRight size={16} />
                  </button>
                </div>
              </FloatingElement>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.cta as React.CSSProperties}>
        <FloatingElement>
          <div style={styles.ctaContainer as React.CSSProperties}>
            <div style={styles.ctaCard}>
              <div style={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={24} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                ))}
              </div>
              
              <h3 style={styles.ctaTitle}>
                מוכן לחוות את <span style={styles.gradientText}>העתיד</span>?
              </h3>
              
              <p style={styles.ctaDescription}>
                הצטרפו לאלפי מורים שכבר חוסכים שעות כל שבוע
              </p>
              
              <div style={styles.ctaButtons2 as React.CSSProperties} className="sm-flex-row">
                <button style={styles.primaryBtn as React.CSSProperties} className="hover-scale hover-glow">
                  <Zap size={20} />
                  התחל ניסיון חינם
                </button>
                
                <button style={styles.secondaryBtn} className="hover-scale">
                  <Globe size={20} />
                  צור קשר למידע נוסף
                </button>
              </div>
            </div>
          </div>
        </FloatingElement>
      </section>

      {/* Footer */}
      <footer style={styles.footer as React.CSSProperties}>
        <div>
          <p style={styles.footerText}>
            &copy; {new Date().getFullYear()} TestChecker Pro. כל הזכויות שמורות.
          </p>
          <div style={styles.footerHeart}>
            <span>Made with</span>
            <div style={styles.heart}></div>
            <span>for better education</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import {
//   CheckCircle,
//   Upload,
//   BarChart3,
//   Clock,
//   Shield,
//   BookOpen,
//   Award,
//   Zap,
//   Star,
//   ArrowRight,
//   FileText,
//   Target,
//   TrendingUp,
//   User,
//   Sparkles,
//   Brain,
//   Eye,
//   Rocket,
//   Globe,
//   Play
// } from "lucide-react";

// const FloatingElement = ({ children, delay = 0 }) => {
//   const [isVisible, setIsVisible] = useState(false);
  
//   useEffect(() => {
//     const timer = setTimeout(() => setIsVisible(true), delay);
//     return () => clearTimeout(timer);
//   }, [delay]);

//   return (
//     <div 
//       style={{
//         transform: isVisible ? 'translateY(0)' : 'translateY(2rem)',
//         opacity: isVisible ? 1 : 0,
//         transition: `all 1s ease-out ${delay}ms`
//       }}
//     >
//       {children}
//     </div>
//   );
// };

// export default function TestCheckerHome() {
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const styles = {
//     container: {
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #0f172a 0%, #1e40af 30%, #0891b2 70%, #0f172a 100%)',
//       fontFamily: 'system-ui, -apple-system, sans-serif',
//       position: 'relative',
//       overflow: 'hidden'
//     },
//     backgroundElements: {
//       position: 'absolute',
//       inset: 0,
//       pointerEvents: 'none'
//     },
//     bgOrb1: {
//       position: 'absolute',
//       top: '5rem',
//       left: '5rem',
//       width: '18rem',
//       height: '18rem',
//       background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
//       borderRadius: '50%',
//       animation: 'pulse 4s ease-in-out infinite'
//     },
//     bgOrb2: {
//       position: 'absolute',
//       top: '15rem',
//       right: '5rem',
//       width: '24rem',
//       height: '24rem',
//       background: 'radial-gradient(circle, rgba(8, 145, 178, 0.2) 0%, transparent 70%)',
//       borderRadius: '50%',
//       animation: 'pulse 4s ease-in-out infinite 2s'
//     },
//     bgOrb3: {
//       position: 'absolute',
//       bottom: '5rem',
//       left: '33%',
//       width: '20rem',
//       height: '20rem',
//       background: 'radial-gradient(circle, rgba(14, 165, 233, 0.2) 0%, transparent 70%)',
//       borderRadius: '50%',
//       animation: 'pulse 4s ease-in-out infinite 4s'
//     },
//     header: {
//       position: 'sticky',
//       top: 0,
//       zIndex: 50,
//       backdropFilter: 'blur(16px)',
//       background: 'rgba(255, 255, 255, 0.05)',
//       borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
//       padding: '1rem 0'
//     },
//     headerContent: {
//       maxWidth: '1200px',
//       margin: '0 auto',
//       padding: '0 1rem',
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center'
//     },
//     logo: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '1rem'
//     },
//     logoIcon: {
//       position: 'relative',
//       background: 'linear-gradient(45deg, #0ea5e9, #06b6d4)',
//       padding: '0.75rem',
//       borderRadius: '1rem',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       transition: 'transform 0.3s ease',
//       cursor: 'pointer'
//     },
//     logoText: {
//       fontSize: '1.5rem',
//       fontWeight: 'bold',
//       background: 'linear-gradient(45deg, #38bdf8, #06b6d4, #22d3ee)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       backgroundClip: 'text'
//     },
//     logoSubtext: {
//       color: '#bfdbfe',
//       fontSize: '0.875rem'
//     },
//     navButtons: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '1rem'
//     },
//     loginBtn: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       padding: '0.75rem 1.5rem',
//       background: 'linear-gradient(45deg, #0ea5e9, #0891b2)',
//       color: 'white',
//       border: 'none',
//       borderRadius: '9999px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       fontSize: '0.875rem'
//     },
//     signupBtn: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       padding: '0.75rem 1.5rem',
//       background: 'linear-gradient(45deg, #06b6d4, #0891b2, #0ea5e9)',
//       color: 'white',
//       border: 'none',
//       borderRadius: '9999px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       fontSize: '0.875rem'
//     },
//     hero: {
//       position: 'relative',
//       zIndex: 10,
//       padding: '5rem 1rem 8rem',
//       textAlign: 'center',
//       maxWidth: '1200px',
//       margin: '0 auto'
//     },
//     badge: {
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       background: 'rgba(6, 182, 212, 0.2)',
//       backdropFilter: 'blur(8px)',
//       border: '1px solid rgba(6, 182, 212, 0.3)',
//       borderRadius: '9999px',
//       padding: '0.75rem 1.5rem',
//       marginBottom: '2rem',
//       color: '#7dd3fc'
//     },
//     heroTitle: {
//       fontSize: 'clamp(2.5rem, 8vw, 5rem)',
//       fontWeight: '900',
//       marginBottom: '1.5rem',
//       lineHeight: '1.1',
//       color: 'white'
//     },
//     gradientText: {
//       background: 'linear-gradient(45deg, #38bdf8, #06b6d4, #22d3ee)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       backgroundClip: 'text',
//       display: 'block'
//     },
//     heroDescription: {
//       fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
//       color: '#bfdbfe',
//       marginBottom: '3rem',
//       maxWidth: '800px',
//       margin: '0 auto 3rem',
//       lineHeight: '1.6'
//     },
//     ctaButtons: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '1.5rem',
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginBottom: '4rem'
//     },
//     primaryBtn: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.75rem',
//       padding: '1rem 2rem',
//       background: 'linear-gradient(45deg, #0ea5e9, #06b6d4, #22d3ee)',
//       color: 'white',
//       border: 'none',
//       borderRadius: '9999px',
//       fontWeight: 'bold',
//       fontSize: '1.125rem',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       position: 'relative',
//       overflow: 'hidden'
//     },
//     secondaryBtn: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.75rem',
//       padding: '1rem 2rem',
//       background: 'rgba(255, 255, 255, 0.1)',
//       backdropFilter: 'blur(8px)',
//       border: '1px solid rgba(255, 255, 255, 0.2)',
//       color: 'white',
//       borderRadius: '9999px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease'
//     },
//     playIcon: {
//       width: '3rem',
//       height: '3rem',
//       background: 'linear-gradient(45deg, #0ea5e9, #06b6d4)',
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       transition: 'transform 0.3s ease'
//     },
//     stats: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//       gap: '2rem',
//       maxWidth: '800px',
//       margin: '0 auto'
//     },
//     statCard: {
//       background: 'rgba(255, 255, 255, 0.05)',
//       backdropFilter: 'blur(8px)',
//       border: '1px solid rgba(255, 255, 255, 0.1)',
//       borderRadius: '1rem',
//       padding: '1.5rem',
//       textAlign: 'center',
//       transition: 'all 0.3s ease',
//       cursor: 'pointer'
//     },
//     statIcon: {
//       width: '3rem',
//       height: '3rem',
//       margin: '0 auto 1rem',
//       borderRadius: '0.75rem',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       transition: 'transform 0.3s ease'
//     },
//     statValue: {
//       fontSize: '2rem',
//       fontWeight: '900',
//       marginBottom: '0.5rem'
//     },
//     statLabel: {
//       color: '#bfdbfe',
//       fontWeight: '500'
//     },
//     features: {
//       position: 'relative',
//       zIndex: 10,
//       padding: '5rem 1rem',
//       background: 'rgba(15, 23, 42, 0.3)'
//     },
//     featuresContainer: {
//       maxWidth: '1200px',
//       margin: '0 auto'
//     },
//     featuresHeader: {
//       textAlign: 'center',
//       marginBottom: '4rem'
//     },
//     featuresTitle: {
//       fontSize: 'clamp(2rem, 5vw, 3rem)',
//       fontWeight: '900',
//       color: 'white',
//       marginBottom: '1rem'
//     },
//     featuresSubtitle: {
//       fontSize: '1.25rem',
//       color: '#bfdbfe',
//       maxWidth: '600px',
//       margin: '0 auto'
//     },
//     featuresGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
//       gap: '2rem'
//     },
//     featureCard: {
//       background: 'rgba(255, 255, 255, 0.05)',
//       backdropFilter: 'blur(16px)',
//       border: '1px solid rgba(255, 255, 255, 0.1)',
//       borderRadius: '1.5rem',
//       padding: '2rem',
//       transition: 'all 0.5s ease',
//       cursor: 'pointer',
//       position: 'relative',
//       overflow: 'hidden'
//     },
//     featureIcon: {
//       width: '4rem',
//       height: '4rem',
//       borderRadius: '1rem',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginBottom: '1.5rem',
//       transition: 'all 0.3s ease'
//     },
//     featureTitle: {
//       fontSize: '1.5rem',
//       fontWeight: 'bold',
//       color: 'white',
//       marginBottom: '1rem'
//     },
//     featureDescription: {
//       color: '#bfdbfe',
//       marginBottom: '1.5rem',
//       lineHeight: '1.6'
//     },
//     featureList: {
//       marginBottom: '2rem'
//     },
//     featureItem: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.75rem',
//       color: '#bfdbfe',
//       marginBottom: '0.75rem'
//     },
//     featureItemIcon: {
//       width: '1.5rem',
//       height: '1.5rem',
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       flexShrink: 0
//     },
//     featureBtn: {
//       width: '100%',
//       padding: '0.75rem',
//       border: 'none',
//       borderRadius: '0.75rem',
//       color: 'white',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '0.5rem'
//     },
//     cta: {
//       position: 'relative',
//       zIndex: 10,
//       padding: '5rem 1rem'
//     },
//     ctaContainer: {
//       maxWidth: '800px',
//       margin: '0 auto',
//       textAlign: 'center'
//     },
//     ctaCard: {
//       background: 'rgba(6, 182, 212, 0.2)',
//       backdropFilter: 'blur(16px)',
//       border: '1px solid rgba(6, 182, 212, 0.3)',
//       borderRadius: '1.5rem',
//       padding: '3rem'
//     },
//     stars: {
//       display: 'flex',
//       justifyContent: 'center',
//       gap: '0.25rem',
//       marginBottom: '1.5rem'
//     },
//     ctaTitle: {
//       fontSize: '2.5rem',
//       fontWeight: '900',
//       color: 'white',
//       marginBottom: '1rem'
//     },
//     ctaDescription: {
//       fontSize: '1.25rem',
//       color: '#bfdbfe',
//       marginBottom: '2rem'
//     },
//     ctaButtons2: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '1rem',
//       justifyContent: 'center',
//       alignItems: 'center'
//     },
//     footer: {
//       position: 'relative',
//       zIndex: 10,
//       borderTop: '1px solid rgba(255, 255, 255, 0.1)',
//       padding: '2rem 1rem',
//       textAlign: 'center'
//     },
//     footerText: {
//       color: '#94a3b8'
//     },
//     footerHeart: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       gap: '0.5rem',
//       marginTop: '1rem',
//       color: '#94a3b8'
//     },
//     heart: {
//       width: '1rem',
//       height: '1rem',
//       background: 'linear-gradient(45deg, #0ea5e9, #06b6d4)',
//       borderRadius: '50%',
//       animation: 'pulse 2s ease-in-out infinite'
//     }
//   };

//   // Add CSS animations via style tag
//   useEffect(() => {
//     const style = document.createElement('style');
//     style.textContent = `
//       @keyframes pulse {
//         0%, 100% { opacity: 1; transform: scale(1); }
//         50% { opacity: 0.7; transform: scale(1.05); }
//       }
      
//       .hover-scale:hover {
//         transform: scale(1.05) !important;
//       }
      
//       .hover-rotate:hover {
//         transform: scale(1.1) rotate(6deg) !important;
//       }
      
//       .hover-shadow:hover {
//         box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
//       }
      
//       .hover-glow:hover {
//         box-shadow: 0 0 20px rgba(6, 182, 212, 0.5) !important;
//       }

//       @media (min-width: 640px) {
//         .sm-flex-row {
//           flex-direction: row !important;
//         }
//       }
//     `;
//     document.head.appendChild(style);
//     return () => document.head.removeChild(style);
//   }, []);

//   return (
//     <div style={styles.container}>
//       {/* Background Elements */}
//       <div style={styles.backgroundElements}>
//         <div style={styles.bgOrb1}></div>
//         <div style={styles.bgOrb2}></div>
//         <div style={styles.bgOrb3}></div>
//       </div>

//       {/* Header */}
//       <header style={styles.header}>
//         <div style={styles.headerContent}>
//           <FloatingElement>
//             <div style={styles.logo}>
//               <div style={styles.logoIcon} className="hover-scale">
//                 <Brain size={32} color="white" />
//               </div>
//               <div>
//                 <h1 style={styles.logoText}>TestChecker Pro</h1>
//                 <p style={styles.logoSubtext}>מערכת בדיקת מבחנים חכמה</p>
//               </div>
//             </div>
//           </FloatingElement>

//           <FloatingElement delay={200}>
//             <div style={styles.navButtons}>
//               <button style={styles.loginBtn} className="hover-scale hover-glow">
//                 <User size={18} />
//                 התחברות
//               </button>
//               <button style={styles.signupBtn} className="hover-scale hover-glow">
//                 <Rocket size={18} />
//                 הרשמה
//               </button>
//             </div>
//           </FloatingElement>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section style={styles.hero}>
//         <FloatingElement>
//           <div style={styles.badge}>
//             <Sparkles size={16} />
//             <span>חדש! בדיקה בינה מלאכותית מתקדמת</span>
//             <Zap size={16} style={{ color: '#22d3ee' }} />
//           </div>
//         </FloatingElement>

//         <FloatingElement delay={200}>
//           <h2 style={styles.heroTitle}>
//             <span>מערכת בדיקת</span>
//             <span style={styles.gradientText}>מבחנים עתידנית</span>
//           </h2>
//         </FloatingElement>

//         <FloatingElement delay={400}>
//           <p style={styles.heroDescription}>
//             חוו מהפכה בבדיקת מבחנים עם 
//             <span style={{ background: 'linear-gradient(45deg, #38bdf8, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//               {' '}טכנולוגיית AI מתקדמת
//             </span>
//             . חסכו זמן, שפרו דיוק ותתמקדו במה שחשוב באמת - החינוך.
//           </p>
//         </FloatingElement>

//         <FloatingElement delay={600}>
//           <div style={styles.ctaButtons} className="sm-flex-row">
//             <button style={styles.primaryBtn} className="hover-scale hover-glow">
//               <Rocket size={20} />
//               התחל עכשיו בחינם
//               <ArrowRight size={20} />
//             </button>
            
//             <button style={styles.secondaryBtn} className="hover-scale">
//               <div style={styles.playIcon} className="hover-rotate">
//                 <Play size={20} style={{ marginLeft: '2px' }} />
//               </div>
//               צפה בדמו חי
//             </button>
//           </div>
//         </FloatingElement>

//         {/* Stats */}
//         <FloatingElement delay={800}>
//           <div style={styles.stats}>
//             {[
//               { value: "50K+", label: "מבחנים נבדקו", icon: <FileText size={24} />, gradient: "linear-gradient(45deg, #38bdf8, #0ea5e9)" },
//               { value: "2K+", label: "מורים פעילים", icon: <User size={24} />, gradient: "linear-gradient(45deg, #06b6d4, #0891b2)" },
//               { value: "99.8%", label: "דיוק בבדיקה", icon: <Target size={24} />, gradient: "linear-gradient(45deg, #0ea5e9, #06b6d4)" },
//               { value: "90%", label: "חיסכון בזמן", icon: <Clock size={24} />, gradient: "linear-gradient(45deg, #22d3ee, #0ea5e9)" },
//             ].map(({ value, label, icon, gradient }, i) => (
//               <div key={i} style={styles.statCard} className="hover-scale hover-shadow">
//                 <div style={{ ...styles.statIcon, background: gradient }} className="hover-rotate">
//                   {icon}
//                 </div>
//                 <div style={{ ...styles.statValue, background: gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//                   {value}
//                 </div>
//                 <div style={styles.statLabel}>{label}</div>
//               </div>
//             ))}
//           </div>
//         </FloatingElement>
//       </section>

//       {/* Features Section */}
//       <section style={styles.features}>
//         <div style={styles.featuresContainer}>
//           <FloatingElement>
//             <div style={styles.featuresHeader}>
//               <h3 style={styles.featuresTitle}>
//                 למה <span style={styles.gradientText}>TestChecker Pro</span>?
//               </h3>
//               <p style={styles.featuresSubtitle}>
//                 המערכת המתקדמת והחכמה ביותר לבדיקת מבחנים בעולם
//               </p>
//             </div>
//           </FloatingElement>

//           <div style={styles.featuresGrid}>
//             {[
//               {
//                 icon: <Upload size={32} />,
//                 title: "העלאה חכמה ומהירה",
//                 description: "העלו מבחנים בכל פורמט - תמונות, PDF, סריקות ואפילו כתב יד",
//                 features: ["זיהוי אוטומטי של פורמט", "עיבוד מקבילי מהיר", "תמיכה ב-50+ שפות"],
//                 gradient: "linear-gradient(45deg, #0ea5e9, #06b6d4)",
//                 iconGradient: "linear-gradient(45deg, #0ea5e9, #06b6d4)"
//               },
//               {
//                 icon: <Brain size={32} />,
//                 title: "בינה מלאכותית מתקדמת",
//                 description: "AI חכם שמבין הקשר, בודק לוגיקה ונותן משוב מותאם אישית",
//                 features: ["הבנת הקשר מתקדמת", "בדיקה סמנטית", "למידה מתמשכת"],
//                 gradient: "linear-gradient(45deg, #06b6d4, #0891b2)",
//                 iconGradient: "linear-gradient(45deg, #06b6d4, #0891b2)"
//               },
//               {
//                 icon: <BarChart3 size={32} />,
//                 title: "אנליטיקס מתקדם",
//                 description: "דוחות חכמים, תובנות עמוקות וניתוח טרנדים לשיפור מתמיד",
//                 features: ["דוחות אינטראקטיביים", "ניבוי ביצועים", "השוואות מתקדמות"],
//                 gradient: "linear-gradient(45deg, #22d3ee, #0ea5e9)",
//                 iconGradient: "linear-gradient(45deg, #22d3ee, #0ea5e9)"
//               },
//             ].map(({ icon, title, description, features, gradient, iconGradient }, i) => (
//               <FloatingElement key={i} delay={i * 200}>
//                 <div style={styles.featureCard} className="hover-scale hover-glow">
//                   <div style={{ ...styles.featureIcon, background: iconGradient }} className="hover-rotate">
//                     {icon}
//                   </div>
                  
//                   <h4 style={styles.featureTitle}>{title}</h4>
//                   <p style={styles.featureDescription}>{description}</p>
                  
//                   <div style={styles.featureList}>
//                     {features.map((feature, idx) => (
//                       <div key={idx} style={styles.featureItem}>
//                         <div style={{ ...styles.featureItemIcon, background: iconGradient }}>
//                           <CheckCircle size={16} color="white" />
//                         </div>
//                         <span>{feature}</span>
//                       </div>
//                     ))}
//                   </div>

//                   <button style={{ ...styles.featureBtn, background: gradient }} className="hover-scale">
//                     למד עוד
//                     <ArrowRight size={16} />
//                   </button>
//                 </div>
//               </FloatingElement>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section style={styles.cta}>
//         <FloatingElement>
//           <div style={styles.ctaContainer}>
//             <div style={styles.ctaCard}>
//               <div style={styles.stars}>
//                 {[...Array(5)].map((_, i) => (
//                   <Star key={i} size={24} style={{ color: '#22d3ee', fill: '#22d3ee' }} />
//                 ))}
//               </div>
              
//               <h3 style={styles.ctaTitle}>
//                 מוכן לחוות את <span style={styles.gradientText}>העתיד</span>?
//               </h3>
              
//               <p style={styles.ctaDescription}>
//                 הצטרפו לאלפי מורים שכבר חוסכים שעות כל שבוע
//               </p>
              
//               <div style={styles.ctaButtons2} className="sm-flex-row">
//                 <button style={styles.primaryBtn} className="hover-scale hover-glow">
//                   <Zap size={20} />
//                   התחל ניסיון חינם
//                 </button>
                
//                 <button style={styles.secondaryBtn} className="hover-scale">
//                   <Globe size={20} />
//                   צור קשר למידע נוסף
//                 </button>
//               </div>
//             </div>
//           </div>
//         </FloatingElement>
//       </section>

//       {/* Footer */}
//       <footer style={styles.footer}>
//         <div>
//           <p style={styles.footerText}>
//             &copy; {new Date().getFullYear()} TestChecker Pro. כל הזכויות שמורות.
//           </p>
//           <div style={styles.footerHeart}>
//             <span>Made with</span>
//             <div style={styles.heart}></div>
//             <span>for better education</span>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }