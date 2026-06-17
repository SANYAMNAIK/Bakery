import React, { useState } from 'react';
import { TabContent, TabPane, } from 'reactstrap';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import cake from '../../images/cake.svg';
import cookie from '../../images/cookie.svg';
import bread from '../../images/bread.svg';
import cupcake from '../../images/cupcake.svg';
import bakery from '../../images/bakery.svg';
import namkeen from '../../images/namkeen.svg';
import tea from '../../images/teaservings.svg';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import  Tab3 from './Tab3';
import Tab4 from './Tab4';
import Tab5 from './Tab5';
import Tab6 from './Tab6';
import Tab7 from './Tab7';


const Popupss = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
	const [tab, setTab]=useState(<Tab1 />)
    return (
        <div class="section-full bg-white pizza-full-menu">
            <div tabs>

			<div className="bg-primary pizza-items">
					<div className="container">
						<ul className="nav nav-tabs pizza-items filters">
							<li className="nav-item item">
								<input type="radio"/>
							   <Link className= {classnames({ active: activeTab === '1' },'item-icon-box nav-link')  } 
									onClick={() => { toggle('1'); setTab(<Tab1 />) }} >
									<img src={bakery} />
									<span>Daily Routine</span>
								</Link>
							</li>
							<li className="nav-item item">
								<input type="radio" />
								<Link className={classnames({ active: activeTab === '2' },'item-icon-box nav-link')}
									onClick={() => { toggle('2'); setTab(<Tab2 />)}}>
									<img src={tea} />
									<span>Tea-Servings</span>
								</Link>
							</li>
							<li className="nav-item item">
								<input type="radio" />
								<Link className= {classnames({ active: activeTab === '3' },'item-icon-box nav-link')}
									onClick={() => { toggle('3');setTab(<Tab3 />) }}>
								<img src={bread} />
									<span>Bread</span>
								</Link>
							</li>
							<li className="nav-item item">
								<input type="radio" />
								<Link className={classnames({ active: activeTab === '4' },'item-icon-box nav-link')}
									onClick={() => { toggle('4'); setTab(<Tab4 />)}}>
								<img src={cupcake} />
									<span>Cupcake</span>
								</Link>
							</li>
							<li className="nav-item item">
								<input type="radio" />
								<Link className={classnames({ active: activeTab === '5' },'item-icon-box nav-link')}
									onClick={() => { toggle('5'); setTab(<Tab5 />)}}>
									<img src={cake} />
									<span>Cake</span>
								</Link>
							</li>							
							<li className="nav-item item">
								<input type="radio" />
								<Link className={classnames({ active: activeTab === '6' },'item-icon-box nav-link')}
									onClick={() => { toggle('6'); setTab(<Tab6 />)}}>
								<img src={cookie} />
									<span>Cookies</span>
								</Link>
							</li>
						
							<li className="nav-item item">
								<input type="radio" />
								<Link className={classnames({ active: activeTab === '7' },'item-icon-box nav-link')}
									onClick={() => { toggle('7'); setTab(<Tab7 />)}}>
									<img src={namkeen} />
									<span>Namkeen</span>
								</Link>
							</li>
					
					
						</ul>
					</div>
                </div>
            </div>
			
			<div className="content-inner">
				<div className="container-fluid">
					<TabContent activeTab={activeTab}>
					<TabPane tabId="1">
					{tab}
					</TabPane>
					
						<TabPane tabId="2">
							{tab}	
						</TabPane>
						<TabPane tabId="3">
							{tab}
						</TabPane>
						<TabPane tabId="4">
							{tab}
						</TabPane>
						<TabPane tabId="5">
							{tab}
						</TabPane>
						
						<TabPane tabId="6">
							{tab}
						</TabPane>
						
						
						  <TabPane tabId="7">
							{tab}
						</TabPane>	
					</TabContent>
				</div>	
			</div>	
        </div>
    );
}

export default Popupss;