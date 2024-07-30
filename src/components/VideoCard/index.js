import {Link} from 'react-router-dom'

import './index.css'

const VideoCard = props => {
  const {video} = props
  const {id, title, thumbnailUrl, name, progileImg, viewCount, publishedAt} =
    video

  return (
    <div>
      <Link to={`/videos/${id}`} className="link">
        <li key={id} className="card">
          <img src={thumbnailUrl} alt="video thumbnail" className="thumbnail" />

          <section className="Lower">
            <img src={progileImg} alt="channel logo" className="clogo" />
            <div className="txt">
              <p className="title">{title}</p>
              <p className="name">{name}</p>
              <p className="views">
                {viewCount} views {publishedAt}
              </p>
            </div>
          </section>
        </li>
      </Link>
    </div>
  )
}

export default VideoCard
