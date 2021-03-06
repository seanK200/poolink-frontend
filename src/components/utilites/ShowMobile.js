import { breakpoints } from '../../consts/responsive';
import { useData } from '../../contexts/DataProvider';

export default function ShowMobile({ children, only }) {
  const { windowSize } = useData();

  if (windowSize.width <= breakpoints.sm) {
    if (children) return children;
  }
  return null;
}
