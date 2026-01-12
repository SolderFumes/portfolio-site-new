import "./App.css"
import { useState, useRef } from 'react'
export default function App() {
	return ( 
		<div className="mainDiv">
			<h1>Welcome to the site</h1>
			<Desktop />
		</div>
	)
}

function Desktop() {
	const desktopRef = useRef(null)
	function AppWindow() {
		const leftOffsetRef = useRef([0, 0])
		const rightOffsetRef = useRef([0, 0])
		const appWindowRef = useRef(null)
		function startDragging(event) {
			// let's calculate the x and y distance from the cursor to the top left of the div
			let divCoords = appWindowRef.current.getBoundingClientRect()
			let leftDivX = divCoords.left
			let rightDivX = divCoords.right
			let topDivY = divCoords.top
			let bottomDivY = divCoords.bottom
			let mouseX = event.clientX
			let mouseY = event.clientY
			let leftOffsetX = mouseX - leftDivX //how far to the right of the div is the mouse?
			let rightOffsetX = mouseX - rightDivX
			let topOffsetY = mouseY - topDivY //how far above the div is the mouse? Should always be negative.
			let bottomOffsetY = mouseY - bottomDivY

			leftOffsetRef.current = [leftOffsetX, topOffsetY]
			rightOffsetRef.current = [rightOffsetX, bottomOffsetY]
			console.log(leftOffsetRef.current)
			console.log(rightOffsetRef.current)
			// If something is being dragged, we will always handle mousemove even if the mouse is over another element
			window.addEventListener('mousemove', dragMove)
			window.addEventListener('mouseup', stopDragging)
		}
		function dragMove(event) {
			// put the dragged div where the mouse is, minus the initial leftOffset.
			let leftpos = event.clientX - leftOffsetRef.current[0]
			let toppos = event.clientY - leftOffsetRef.current[1]
			let rightpos = event.clientX - rightOffsetRef.current[0]
			let bottompos = event.clientY - rightOffsetRef.current[1]
			let desktopCoords = desktopRef.current.getBoundingClientRect()
			if (leftpos >= desktopCoords.left && rightpos <= desktopCoords.right) {
				appWindowRef.current.style.left = leftpos + "px"
			}
			if (toppos >= desktopCoords.top && bottompos <= desktopRef.current.getBoundingClientRect().bottom) {
				appWindowRef.current.style.top = toppos + "px"
			}
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
	return (
		<div ref={desktopRef} className="desktop" id="desktop">
			<AppWindow />
		</div>
	)
}
