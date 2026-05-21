import React, { useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import CustomScrollbar from './components/CustomScrollbar';
import AdminCMS from './components/AdminCMS';
import { sectionsData } from './data/sections';
import { injectGothamFonts } from './utils/fonts';
import { applySeoForPath, getSeoRouteForPath } from './utils/seo';
import './index.css';

injectGothamFonts();

const DEFAULT_SECTION_ID = sectionsData[0]?.id;

const resolveSectionFromPath = (pathname) => {
  const route = getSeoRouteForPath(pathname);
  if (route.routeType === 'cms') {
    return { route, sectionId: null };
  }

  if (route.routeType === 'home' || route.routeType === 'not-found') {
    return { route, sectionId: DEFAULT_SECTION_ID };
  }

  if (route.routeType === 'project') {
    const projectsSection = sectionsData.find((section) => section.slug === 'projects');
    return { route, sectionId: projectsSection?.id || DEFAULT_SECTION_ID };
  }

  const section = sectionsData.find((item) => item.slug === route.sectionSlug);
  return { route, sectionId: section?.id || DEFAULT_SECTION_ID };
};

function App() {
  const [activeSectionId, setActiveSectionId] = useState(DEFAULT_SECTION_ID);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hideLoader, setHideLoader] = useState(false);
  const [isAdminPath, setIsAdminPath] = useState(false);
  const [isNotFoundRoute, setIsNotFoundRoute] = useState(false);
  const rightContainerRef = useRef(null);
  const manualScrollRef = useRef(false);

  const sectionById = useMemo(
    () => new Map(sectionsData.map((section) => [section.id, section])),
    [],
  );

  useEffect(() => {
    const syncRouteState = (pathname) => {
      const { route, sectionId } = resolveSectionFromPath(pathname);
      setIsAdminPath(route.routeType === 'cms');
      setIsNotFoundRoute(route.routeType === 'not-found');
      applySeoForPath(pathname);

      if (sectionId) {
        setActiveSectionId(sectionId);
        requestAnimationFrame(() => {
          const sectionEl = document.getElementById(sectionId);
          if (sectionEl) {
            sectionEl.scrollIntoView();
          }
        });
      }
    };

    syncRouteState(window.location.pathname);

    const onPopState = () => {
      syncRouteState(window.location.pathname);
    };

    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  useEffect(() => {
    if (isAdminPath || loading) return;

    const currentSection = sectionById.get(activeSectionId);
    if (!currentSection) return;

    const currentPath = window.location.pathname;
    const currentRoute = getSeoRouteForPath(currentPath);
    if (currentRoute.routeType === 'not-found') {
      applySeoForPath(currentPath);
      setIsNotFoundRoute(true);
      return;
    }

    let nextPath = `/${currentSection.slug}`;

    // Keep active project detail paths when the projects section is active.
    if (currentSection.slug === 'projects' && currentRoute.routeType === 'project') {
      nextPath = currentPath;
    }

    if (currentSection.slug === sectionsData[0].slug && currentRoute.routeType === 'home') {
      nextPath = '/';
    }

    if (currentPath !== nextPath) {
      window.history.replaceState(null, '', nextPath);
    }
    const route = applySeoForPath(nextPath);
    setIsNotFoundRoute(route?.routeType === 'not-found');
  }, [activeSectionId, isAdminPath, loading, sectionById]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setHideLoader(true);
    }, 2000);

    const timer2 = setTimeout(() => {
      setLoading(false);
    }, 1300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleNavClick = (sectionId, nextPath) => {
    manualScrollRef.current = true;

    flushSync(() => {
      setActiveSectionId(sectionId);
      setIsAutoScrolling(true);
      setIsNotFoundRoute(false);
    });

    if (nextPath && window.location.pathname !== nextPath) {
      window.history.pushState(null, '', nextPath);
      applySeoForPath(nextPath);
    }

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    manualScrollRef.current = true;

    flushSync(() => {
      setActiveSectionId(DEFAULT_SECTION_ID);
      setIsAutoScrolling(true);
      setIsNotFoundRoute(false);
    });

    if (window.location.pathname !== '/') {
      window.history.pushState(null, '', '/');
    }
    applySeoForPath('/');

    const targetSection = document.getElementById(DEFAULT_SECTION_ID);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isAdminPath) {
    return <AdminCMS />;
  }

  return (
    <>
      {loading && (
        <div id="preloader" className={hideLoader ? 'hide' : ''}>
          <span className="loadertext">NEEL GENIX</span>
          <img
            src={`${import.meta.env.BASE_URL}assets/loader.svg`}
            alt="Neel Genix"
            className="loader"
            width="64"
            height="64"
          />
        </div>
      )}
      <div className="app-container">
        <Sidebar
          sections={sectionsData}
          activeSectionId={activeSectionId}
          onNavClick={handleNavClick}
          onLogoClick={handleLogoClick}
        />
        <MainContent
          sections={sectionsData}
          activeSectionId={activeSectionId}
          setActiveSectionId={setActiveSectionId}
          isAutoScrolling={isAutoScrolling}
          setIsAutoScrolling={setIsAutoScrolling}
          rightContainerRef={rightContainerRef}
          manualScrollRef={manualScrollRef}
          isNotFoundRoute={isNotFoundRoute}
        />
        <CustomScrollbar containerRef={rightContainerRef} />
      </div>
    </>
  );
}

export default App;
