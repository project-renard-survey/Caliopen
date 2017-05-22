import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { v1 as uuidV1 } from 'uuid';
import PiGraph from './components/PiGraph';
import Ratings from './components/Ratings';
import Button from '../Button';
import Dropdown, { withDropdownControl } from '../Dropdown';

import './style.scss';

const PI_MAX = 100; // max value for PI levels
const DropdownControl = withDropdownControl(Button);


const MultidimensionalPi = ({ pi, displayAveragePi, className, mini }) => {
  const gridWidth = PI_MAX * 2;
  const piLength = pi.length;
  const angle = 360 / piLength;
  const piLevels = pi.map(p => p.level);
  const averagePi = (piLevels.reduce((a, b) => a + b, 0)) / piLength;
  const id = uuidV1();

  return (
    <div className={classnames('m-multidimensional-pi', className)}>
      {mini ? (
        <div className="m-multidimensional-pi__mini-pi">
          <DropdownControl toggle={id} className="m-multidimensional-pi__toggle-mini-pi">
            <Ratings
              pi={pi}
              piMax={PI_MAX}
              mini
            />
          </DropdownControl>

          <Dropdown
            id={id}
            className="m-multidimensional-pi__mini-graph"
            position="bottom"
            closeOnClick
          >
            <Ratings
              pi={pi}
              piMax={PI_MAX}
              averagePi={averagePi}
              displayAveragePi={displayAveragePi}
            />
          </Dropdown>
        </div>
      ) : (
        <div>
          <PiGraph
            gridWidth={gridWidth}
            piMax={PI_MAX}
            pi={pi}
            angle={angle}
          />
          <Ratings
            pi={pi}
            piMax={PI_MAX}
            averagePi={averagePi}
            displayAveragePi={displayAveragePi}
          />
        </div>
      )
    }

    </div>
  );
};
MultidimensionalPi.defaultProps = {
  displayAveragePi: false,
  className: null,
  mini: false,
};
MultidimensionalPi.propTypes = {
  pi: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  mini: PropTypes.bool,
  className: PropTypes.string,
  displayAveragePi: PropTypes.bool,
};
export default MultidimensionalPi;