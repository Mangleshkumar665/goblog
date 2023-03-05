import React from 'react'

const AdvancedCreatePost = () => {

    const addParagraph = () => {

        console.log("add paragraph ")
    }
    const addElement = () => {
        console.log("add element ")
    }

    const removeElement = () => {
        console.log("remove element ")
    }

    return (
        <div className='container d-flex justify-content-center align-item-center' data-spy="scroll">

            <div className="card" style={{ width: "70vw", height: "80vh" }}>

                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                </div>





                <ul className="list-group list-group-flush " data-spy="scroll" data-offset="20">
                    <li className="list-group-item">

                        <div className='class-paragraph'>
                            <div className='id'> 1 -</div>
                            <input value="enter paragraph " id="" rows="4"></input >
                            <button className='btn btn-primary ' onClick={{ addElement }}>  add </button>
                            <button className="btn btn-danger" onClick={(removeElement)}> remove  </button>
                        </div>

                    </li>
                    <li className="list-group-item">
                        <div className='class-heading'>
                            <div className='id'> 2 -</div>
                            <input value="enter heading here  " id="" rows="4"></input >
                            <button className='btn btn-primary ' onClick={{ addElement }}>  add </button>
                            <button className="btn btn-danger" onClick={(removeElement)}> remove  </button>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className='class-heading'>
                            <div className='id'> 3 -</div>
                            Add a Horizontal Line 
                            <hr  style={{width:"30vw"}}/>
                            <button className='btn btn-primary ' onClick={{ addElement }}>  add </button>
                            <button className="btn btn-danger" onClick={(removeElement)}> remove  </button>
                        </div>
                    </li>
                </ul>

                <ul className="row">
                    <li className=" col btn">paragraph</li>
                    <li className=" col btn">Heading </li>
                    <li className=" col btn ">Horizontal Line </li>
                </ul>


                <div className="card-body">
                    <button href="#" className="btn btn-primary">Post </button>
                    <button href="#" className="btn btn-danger">Clear </button>
                </div>
            </div>
        </div>
    )
}

export default AdvancedCreatePost
