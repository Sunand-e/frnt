import ReactPlayer from 'react-player'

export default function EventDetails({event}) {

  return (
    <div className="flex flex-col">
      <p><span>Event Date: </span></p>
      <p><span>Location: </span></p>
      <p><span>Link: </span></p>
    </div>
  )

}
