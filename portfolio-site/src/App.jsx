import "./App.css"
import { useState, useRef } from 'react'
export default function App() {
	return ( 
		<div className="mainDiv">
			<h1>Welcome to the site</h1>
			<div className="desktop" id="desktop">
				<AppWindow />
			</div>
		</div>
	)
}

function AppWindow() {
	const offsetRef = useRef([0, 0])
	const appWindowRef = useRef(null)
	function startDragging(event) {
		// let's calculate the x and y distance from the cursor to the top left of the div
		let divCoords = appWindowRef.current.getBoundingClientRect()
		let divX = divCoords.left
		let divY = divCoords.top
		let mouseX = event.clientX
		let mouseY = event.clientY
	
		let offsetX = mouseX - divX //how far to the right of the div is the mouse?
		let offsetY = mouseY - divY //how far above the div is the mouse? Should always be negative.

		offsetRef.current = [offsetX, offsetY]
		console.log(offsetRef.current)
		// If something is being dragged, we will always handle mousemove even if the mouse is over another element
		window.addEventListener('mousemove', dragMove)
		window.addEventListener('mouseup', stopDragging)
	}
	function dragMove(event) {
		// put the dragged div where the mouse is, minus the initial offset.
		console.log(offsetRef.current)
		appWindowRef.current.style.left = event.clientX - offsetRef.current[0] + "px"
		appWindowRef.current.style.top = event.clientY - offsetRef.current[1] + "px"
	}
	function stopDragging(event) {
		window.removeEventListener('mousemove', dragMove)
		window.removeEventListener('mouseup', stopDragging)
	}
	return (
		<div ref={appWindowRef} className="appWindow">	
			<div className="dragbar" onMouseDown={(event) => startDragging(event)}>
				<button className="minimize">-</button>
				<button className="fullscreen">□</button>
				<button className="close">X</button>
			</div>
			<div className="windowContent">

			</div>
		</div>
	)
}
