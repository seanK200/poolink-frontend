import { useEffect, useRef, useState } from 'react';
import { useData } from '../contexts/DataProvider';

export default function useRouteModal(routeModalSize) {
  const { setRouteModalSize, windowSize } = useData();

  // padding at the bottom to make space for floating footer
  const [containerPadding, setContainerPadding] = useState(0);
  const [showModalFooterShadow, setModalFooterShadow] = useState(false);

  const containerRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    if (routeModalSize) setRouteModalSize(routeModalSize);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!containerRef.current || !footerRef.current) return;
    const { height } = footerRef.current.getBoundingClientRect();
    setContainerPadding(height);
  }, [containerRef, footerRef]);

  useEffect(() => {
    if (!containerRef.current || !footerRef.current) return;
    const { height } = containerRef.current.getBoundingClientRect();
    const scrollHeight = containerRef.current.scrollHeight;
    setModalFooterShadow(scrollHeight > height);
  }, [containerRef, footerRef, windowSize]);

  return {
    containerPadding,
    showModalFooterShadow,
    containerRef,
    footerRef,
  };
}
