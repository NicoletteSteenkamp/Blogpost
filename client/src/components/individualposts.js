
function Card(props){
    return (
        
            <div className="card">
                <img className="card-image" src="https://www.theverge.com/2024/3/4/24090025/methanesat-satellite-launch-spacex-bezos-fund-google-map-methane-edf" alt="" />
                <h2 className="card-title">{props.title}</h2>
                <p ClassName="card-text">{props.description}</p>
                <h6 className="">{props.author}  <span ClassName="card-post-date">{props.date}</span></h6>
                <button className="card-btn-like">like</button>
            </div>
    )
}

export default Card