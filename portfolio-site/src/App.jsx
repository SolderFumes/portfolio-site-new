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
	const [windows, setWindows] = useState([]) // array of windows
	const [idNum, setIdNum] = useState(0)
	let highestZ = 1
	function AppWindow({myId}) {
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

			appWindowRef.current.style.zIndex = ++highestZ
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
		function closeWindow(event) {
			console.log('myId' + myId)
			console.log(windows)
			setWindows( windows.filter(win => win.id !== myId ))
			console.log(windows)
		}
		return (
			<div ref={appWindowRef} className="appWindow">	
				<div className="dragbar" onMouseDown={(event) => startDragging(event)}>
					<button className="minimize">-</button>
					<button className="fullscreen">□</button>
					<button className="close" onClick={closeWindow}>X</button>
				</div>
				<div className="windowContent">
					<object id="resume" data="https://www.solderfum.es/images/luka_schuller_resume.pdf?embedded=true">
					</object>
				</div>
			</div>
		)
	}
	function handleClick(event) { // somebody has tried to open a new window
		const newWindow = {id: idNum} // create an object with one attribute so that we can keep track of our windows
		setIdNum(idNum + 1)
		highestZ++
		setWindows([...windows, newWindow])

		switch (event.target.id) { // there's some attribute in the button that tells us what content to put inside the window
			//case 'resume':
				//event.target.appendChild(

		}
	}
	return (
		<div ref={desktopRef} className="desktop" id="desktop">
			<button className="newWindow" data-content="resume" onClick={handleClick}> Resume.pdf </button>
			{windows.map((theWindow) => (
				<AppWindow key={theWindow.id} myId={theWindow.id} />
			))}
		</div>
	)
}
