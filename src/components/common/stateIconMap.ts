import type { StandardState } from '@/types';
import { SolidIcon, LiquidIcon, GasIcon } from './icons';

interface IconProps {
  size?: number;
}

export const stateIconMap: Record<StandardState, React.FC<IconProps>> = {
  solid: SolidIcon,
  liquid: LiquidIcon,
  gas: GasIcon,
};
