import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import logo from "../../assets/logo.png";

const Nav = styled(motion.nav)`
  background-color: ${({ theme }) => theme.colors.background};
  position: fixed;
  width: 100vw;
  top: 0;
  z-index: 1000;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mediumGray};
  transform-origin: top;
`;

const NavContent = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  width: calc(100% - ${({ theme }) => theme.spacing.md} * 2);
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  position: relative;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
`;

const LogoImage = styled(motion.img)`
  width: 140px;
  height: 80px;
  margin: -15px;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 120px;
    height: 70px;
    margin: -10px;
  }
`;

const MenuButton = styled.button<{ $isOpen: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  display: none;
  flex-direction: column;
  gap: 6px;
  padding: 10px;
  z-index: 1001;
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    display: block;
    width: 25px;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: all 0.3s ease;
    transform-origin: 1px;

    &:first-child {
      transform: ${({ $isOpen }) => ($isOpen ? 'rotate(45deg)' : 'rotate(0)')};
    }

    &:nth-child(2) {
      opacity: ${({ $isOpen }) => ($isOpen ? '0' : '1')};
      transform: ${({ $isOpen }) => ($isOpen ? 'translateX(20px)' : 'translateX(0)')};
    }

    &:nth-child(3) {
      transform: ${({ $isOpen }) => ($isOpen ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

const NavLinks = styled.div<{ $isOpen: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin: 0 auto;
  justify-content: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
    height: 100vh;
    width: min(280px, 80vw);
    background: ${({ theme }) => theme.colors.background};
    flex-direction: column;
    padding: 100px ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg};
    transition: right 0.3s ease;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    margin: 0;
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    transition: all 0.3s ease;
    z-index: 999;
    pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  }
`;

const NavLink = styled(motion(Link))<{ $isActive?: boolean }>`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  padding: ${({ theme }) => theme.spacing.sm};
  position: relative;
  letter-spacing: -0.01em;
  transition: color 0.3s ease;
  
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ $isActive }) => ($isActive ? "100%" : "0")};
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    
    &::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

const navLinkVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    }
  })
};

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const { scrollY } = useScroll();

  const navHeight = useTransform(scrollY, [0, 100], ["90px", "70px"]);
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0.95)"]
  );
  const navShadow = useTransform(
    scrollY,
    [0, 100],
    ["0 2px 8px rgba(0, 0, 0, 0.08)", "0 2px 8px rgba(0, 0, 0, 0.12)"]
  );
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const currentScrollY = latest;
    // Show navbar when scrolling up or at the top
    if (currentScrollY < lastScrollY || currentScrollY < 50) {
      setIsVisible(true);
    } 
    // Hide navbar when scrolling down and not at the top
    else if (currentScrollY > 50 && currentScrollY > lastScrollY) {
      setIsVisible(false);
    }
    setLastScrollY(currentScrollY);
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { to: "/about", label: "About" },
    { to: "/outreach", label: "Outreach" },
    { to: "/leaders", label: "Team" },
    { to: "/sponsors", label: "Sponsors" },
    // { to: "/blog", label: "Blog" }
  ];

  return (
    <Nav
      initial={{ 
        height: "90px",
        backgroundColor: "rgba(255, 255, 255, 1)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        y: 0
      }}
      animate={{ 
        y: isVisible ? 0 : '-100%',
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 20
        }
      }}
      style={{
        height: navHeight,
        backgroundColor: navBackground,
        boxShadow: navShadow,
      }}
    >
      <NavContent style={{ height: navHeight }}>
        <LogoLink to="/">
          <LogoImage 
            src={logo} 
            alt="MORTORQ Logo" 
            style={{ scale: logoScale }}
          />
        </LogoLink>
        <MenuButton onClick={toggleMenu} $isOpen={isMenuOpen}>
          <span />
          <span />
          <span />
        </MenuButton>
        <Overlay $isOpen={isMenuOpen} onClick={closeMenu} />
        <NavLinks $isOpen={isMenuOpen}>
          {navLinks.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              $isActive={link.to === "/" ? location.pathname === "/" : location.pathname.startsWith(link.to)}
              onClick={closeMenu}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={navLinkVariants}
            >
              {link.label}
            </NavLink>
          ))}
        </NavLinks>
      </NavContent>
    </Nav>
  );
};

export default Navigation;
