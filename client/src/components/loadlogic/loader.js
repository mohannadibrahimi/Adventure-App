import React from 'react';
import { ClipLoader } from 'react-spinners';
import { css } from 'react-emotion';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export const Loader = (propLen, content) => {
    if(propLen === 0){
        return(
          <div className="clip-container">
            <ClipLoader
              className={override}
              sizeUnit={"px"}
              size={50}
              color={'#E74C3C'}
              loading={true}
            />
          </div>
        ) 
      } else {
        return content()
      }
}