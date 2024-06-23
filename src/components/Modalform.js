import React from 'react'
import '../styles/modal.css'

function Modalform(props) {

    const { show, handleClose, children } = props;

  return (
   <div className={show ? "modal display-block" : "modal display-none"}>
    <div className='cetermodal'>
      <div className="modal-main">
        {children}
        <button onClick={handleClose} className="close-button">Final Submit</button>
      </div>
      </div>
    </div>
  )
}

export default Modalform
