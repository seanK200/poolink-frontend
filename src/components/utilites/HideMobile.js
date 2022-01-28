import { breakpoints } from '../../consts/responsive';
import { useData } from '../../contexts/DataProvider';

export default function HideMobile({ children }) {
  const { windowSize } = useData();

  if (windowSize.width > breakpoints.sm) {
    if (children) return children;
  }
  return null;
}
