import React, { useState, memo } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { useSpring, a } from 'react-spring';

import { useMeasure, usePrevious } from '../../hooks';
import { Box, toggle } from '../styled-components/styles';

export const Tree = memo(({ color, children, name, style, defaultOpen = true }) => {
  const [isOpen, setOpen] = useState(defaultOpen);
  const previous = usePrevious(isOpen);
  const [bind, { height: viewHeight }] = useMeasure();

  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      transform: `translate3d(${isOpen ? 0 : 20}px,0,0)`
    }
  });
  const { rotateZ } = useSpring({
    from: {
      rotateZ: 180
    },
    to: {
      rotateZ: isOpen ? 0 : 180
    }
  });

  const Icon = a(MdKeyboardArrowUp);

  return (
    <Box>
      <Box color={color} isInline>
        <Icon
          style={{ ...toggle, transform: rotateZ.interpolate(z => `rotateZ(${z}deg)`) }}
          onClick={() => setOpen(!isOpen)}
        />
        <span style={style}>{name}</span>
      </Box>
      <Box
        marginLeft="44px"
        marginBottom="10px"
        overflow="hidden"
        style={{ opacity, height: isOpen && previous === isOpen ? 'auto' : height }}
      >
        <Box marginTop="10px" style={{ transform }} {...bind} children={children} />
      </Box>
    </Box>
  );
});
