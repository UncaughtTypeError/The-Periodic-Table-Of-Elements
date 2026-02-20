import type { StandardState, NaturalOccurrence } from '@/types';
import {
  SolidIcon,
  LiquidIcon,
  GasIcon,
  PrimordialIcon,
  FromDecayIcon,
  SyntheticIcon,
} from './icons';

interface IconProps {
  size?: number;
}

export const stateIconMap: Record<StandardState, React.FC<IconProps>> = {
  solid: SolidIcon,
  liquid: LiquidIcon,
  gas: GasIcon,
};

export const occurrenceIconMap: Record<
  NaturalOccurrence,
  React.FC<IconProps>
> = {
  primordial: PrimordialIcon,
  'from-decay': FromDecayIcon,
  synthetic: SyntheticIcon,
};

export const occurrenceLabelMap: Record<NaturalOccurrence, string> = {
  primordial: 'Primordial',
  'from-decay': 'From Decay',
  synthetic: 'Synthetic',
};
