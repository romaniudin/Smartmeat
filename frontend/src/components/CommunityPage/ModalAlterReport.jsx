import React from 'react'

import Calcform from './CalcForm'
import './CommunitPage.css'

const ModalAlterReport = ({report, getCalculation, email, alterReport, calculator, alteredReports}) => {
    
    let { carbon, petrol, frequency, quantity, order} = report
    return (
      <div className="modal fade" id="saveReportModal" tabIndex="-1" role="dialog" aria-labelledby="saveReportModal" aria-hidden="true">
      <div className="modal-dialog " role="document">
        <div className="modal-content size-large">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Alter Report</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <Calcform 
              email={email}
              getCalculation={getCalculation}
              carbon={carbon}
              petrol={petrol}
              frequency = {frequency}
              quantity = {quantity}
              order = {order}  
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button 
              disabled={calculator.result === 0 ? true : false} 
              data-dismiss="modal" type="button" className="btn btn-primary" 
              onClick={()=>alterReport( report, calculator, alteredReports, email )}
            >
              {calculator.result === 0 ? "Calculate First!" : "See the Results!"}
            </button>
          </div>
        </div>
      </div>
    </div>
    )
  
}

export default ModalAlterReport