import css from "./VideoCamera.module.css"
import ProgressBar from '@ramonak/react-progress-bar'
import React from "react"

function VideoCamera({ errorState, videoRef }) {
    console.log("video re-render")
    return (
        <div id='video_camera' className={css.videoCamera}>
            <video id='videoElement' className={`${css.videoElement} ${errorState ? css.active : ""}`} ref={videoRef} autoPlay={true} muted={true} width={100} height={200}>
                <track kind='captions' />
            </video>
            <ProgressBar
                completed={100}
                maxCompleted={100}
                height='25px'
                bgColor='#e71e50'
                isLabelVisible={false}
                animateOnRender={true}
                initCompletedOnAnimation={10}
                transitionDuration='20s'
            />
        </div>
    )
}
export default React.memo(VideoCamera)