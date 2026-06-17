
import{ React,useRef,useState} from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Logo from "../logo.svg";
import avtar3 from "../images/user/man_avatar3.jpg";
import pic7 from '../images/products/pic7.jpg';
import pic8 from '../images/products/pic8.jpg';
import pic9 from '../images/products/pic9.jpg';
import pic10 from '../images/products/pic10.jpg';
function Newcust() {
    const fileInputRef = useRef(null);
    const [img,setImg]=useState(pic9);
const[response,setResponse]=useState(null);
const[category,setcategory]=useState(null);
const url="http://localhost:5000/api/admin/customers/add";


const handleButtonClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
};

    const imagebase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        const data = new Promise((resolve, reject) => {
            reader.onload = (e) => resolve(reader.result);
            reader.onerror = (err) => reject(err);
        });
        return data;
    }
    const handleimg = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const image = await imagebase64(file);
        
        setImg(image);
    }
   
    const handleonsubmit =async(e)=>{
        e.preventDefault();
        let form = e.target;
        let formdata = new FormData(form);
        let data = Object.fromEntries(formdata.entries());
        JSON.stringify(data);
        const combinedData = {
            ...data,
            image: img 
        };
        console.log(combinedData);
        const response = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(combinedData),
        });
        const responseData = await response.json();
        setResponse(responseData);
        alert(responseData.msg);
    }
    return (
        <>
            <Navbar activator3="active" />
            <div className="layout-wrapper">


                <div className="header">
                    <div className="menu-toggle-btn">
                        <a href="#">
                            <i className="bi bi-list"></i>
                        </a>
                    </div>
                    <Link to={('/')}>
                        <a className="logo">
                            <img width="100" src="../logo.png" alt="logo" />
                        </a>
                    </Link>
                    <div className="page-title">Adding new customer</div>
                    <form class="search-form">
                        <div class="input-group">
                            <button class="btn btn-outline-light" type="button" id="button-addon1">
                                <i class="bi bi-search"></i>
                            </button>
                            <input type="text" class="form-control" placeholder="Search..."
                                aria-label="Example text with button addon" aria-describedby="button-addon1" />
                            <Link to={'#'} className="btn btn-outline-light close-header-search-bar">
                                <i className="bi bi-x"></i></Link>
                        </div>
                    </form>
                    <div class="header-bar ms-auto">
                        <ul class="navbar-nav justify-content-end">
                            <li class="nav-item">
                                <Link to={'#'} className="nav-link nav-link-notify" data-count="2" data-sidebar-target="#notifications"> <i className="bi bi-bell icon-lg"></i></Link>

                            </li>

                            <li class="nav-item ms-3">
                            </li>
                        </ul>
                    </div>

                    <div class="header-mobile-buttons">
                        <Link to={'#'} className="search-bar-btn"> <i className="bi bi-search"></i></Link>
                        <Link to={'#'} className="actions-btn"><i className="bi bi-three-dots"></i></Link>
                    </div>

                </div>

                <div className="content ">

                    <div className="row flex-column-reverse flex-md-row">
                        <div className="col-md-8">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="mb-4">
                                    <form onSubmit={handleonsubmit}>
                                        <div className="d-flex flex-column flex-md-row text-center text-md-start mb-3">
                                            <figure className="me-4 flex-shrink-0">
                                                <img width="100" className="rounded-pill"
                                                    src={img} alt="..." />
                                            </figure>
                                            <div className="flex-fill">
                                                <h5 className="mb-3">Adek Kembar</h5>
                                               
                                                    <button onClick={handleButtonClick} className="btn btn-primary me-2" >Select Image</button>
                                                    <input
                                                        type="file"
                                                        ref={fileInputRef}
                                                        accept=".jpg,.png,.jpeg"
                                                        style={{ display: 'none' }}
                                                        filename={img}
                                                        onChange={handleimg}
                                                    />
                                                   &nbsp;&nbsp;
                                                   
                                                
                                               
                                                <p className="small text-muted mt-3">For best results, use an image at least
                                                    256px by 256px in either .jpg or .png format</p>
                                            </div>
                                        </div>
                                        <div className="card mb-4">
                                            <div className="card-body">
                                                <h6 className="card-title mb-4">Basic Information</h6>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Full-Name</label>
                                                            <input type="text" name="name" className="form-control"  />
                                                        </div>

                                                        <div className="mb-3">
                                                            <label className="form-label">Email</label>
                                                            <input type="text" name="email" className="form-control"  />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label">Address</label>
                                                            <textarea rows={"4"} name="address" className="form-control"  ></textarea>
                                                        </div>

                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Username</label>
                                                            <input type="text" name="username" className="form-control"  />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="form-label">Phone</label>
                                                            <input type="text" name="phone" className="form-control"  />
                                                        </div>
                                                        <div className="mb-3">
                                                <label className="form-label"> Password</label>
                                                <input type="password" name="pass" className="form-control" />
                                            </div>
                                                    </div>
                                                    <button type="Submit" className="btn btn-primary me-2" >Add Customer</button>
                                                </div>
                                            </div>
                                        </div>
                                        </form>
                                    </div>


                                </div>
                               
                                <div className="tab-pane fade" id="notification-settings" role="tabpanel"
                                    aria-labelledby="notification-settings-tab">
                                    <div className="card">
                                        <div className="card-body">
                                            <h6 className="card-title mb-4">Notifications</h6>
                                            <h6 className="mb-4">Activity Notifications</h6>
                                            <div className="mb-5">
                                                <div className="mb-3">
                                                    <div className="form-check form-switch">
                                                        <input type="checkbox" className="form-check-input" checked id="cs1" />
                                                        <label className="form-check-label" for="cs1">Someone assigns me to a task</label>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <div className="form-check form-switch">
                                                        <input type="checkbox" className="form-check-input" checked id="cs2" />
                                                        <label className="form-check-label" for="cs2">Someone mentions me in a
                                                            conversation</label>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <div className="form-check form-switch">
                                                        <input type="checkbox" className="form-check-input" checked id="cs3" />
                                                        <label className="form-check-label" for="cs3">Someone adds me to a project</label>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <div className="form-check form-switch">
                                                        <input type="checkbox" className="form-check-input" id="cs4" />
                                                        <label className="form-check-label" for="cs4">Activity on a project I am a member
                                                            of</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <h6 className="mb-4">Service Notifications</h6>
                                            <div>
                                                <div className="mb-3">
                                                    <div className="form-check form-switch">
                                                        <input type="checkbox" className="form-check-input" id="cs5" />
                                                        <label className="form-check-label" for="cs5">Monthly newsletter</label>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <div className="form-check form-switch">
                                                        <input type="checkbox" className="form-check-input" checked id="cs6" />
                                                        <label className="form-check-label" for="cs6">Major feature enhancements</label>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="form-check form-switch">
                                                        <input type="checkbox" className="form-check-input" id="cs7" />
                                                        <label className="form-check-label" for="cs7">Minor updates and bug fixes</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="integrations" role="tabpanel" aria-labelledby="integrations-tab">
                                    <div className="card widget">
                                        <div className="card-header">
                                            <h6 className="card-title">Integrations</h6>
                                        </div>
                                        <div className="card-body p-0 overflow-hidden">
                                            <div className="list-group list-group-flush">
                                                <div className="list-group-item p-4">
                                                    <div className="d-md-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <figure className="mb-0 me-3">
                                                                <img src="../images/svg/logo-integration-slack.svg"
                                                                    alt="..." />
                                                            </figure>
                                                            <div>
                                                                <h5 className="mb-1">Slack</h5>
                                                                <small className="text-muted">Permissions: Read, Write, Comment</small>
                                                            </div>
                                                        </div>
                                                        <button className="btn btn-outline-danger mt-3 mt-md-0">Disconnect</button>
                                                    </div>
                                                </div>
                                                <div className="list-group-item p-4">
                                                    <div className="d-md-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <figure className="mb-0 me-3">
                                                                <img src="../images/svg/logo-integration-drive.svg"
                                                                    alt="..." />
                                                            </figure>
                                                            <div>
                                                                <h5 className="mb-1">Google Drive</h5>
                                                                <small className="text-muted">Permissions: Read, Write</small>
                                                            </div>
                                                        </div>
                                                        <button className="btn btn-outline-success mt-3 mt-md-0">Connect</button>
                                                    </div>
                                                </div>
                                                <div className="list-group-item p-4">
                                                    <div className="d-md-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <figure className="mb-0 me-3">
                                                                <img src="../images/svg/logo-integration-dropbox.svg"
                                                                    alt="... " />
                                                            </figure>
                                                            <div>
                                                                <h5 className="mb-1">Dropbox</h5>
                                                                <small className="text-muted">Permissions: Read, Write, Upload</small>
                                                            </div>
                                                        </div>
                                                        <button className="btn btn-outline-danger mt-3 mt-md-0">Disconnect</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card sticky-top mb-4 mb-md-0">
                                <div className="card-body">
                                    <ul className="nav nav-pills flex-column gap-2" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link active" id="profile-tab" data-bs-toggle="tab" href="#profile" role="tab"
                                                aria-controls="profile" aria-selected="true">
                                                <i className="bi bi-person me-2"></i> Profile
                                            </a>
                                        </li>
                                        

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>




            </div>

        </>
    );
}
export default Newcust;