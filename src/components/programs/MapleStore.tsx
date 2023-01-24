import '../../styles/style.scss'
import { taskType } from "../../types/project_types";
import { Programs, Tasks } from "../context/Programs";
import { useContext , useRef , useEffect } from "react";
import { VscChromeMinimize } from 'react-icons/vsc'
import { RxCross2 } from 'react-icons/rx';
import { dragDrop } from '../../helper/DragDrop'
import { minimizeProgram } from '../../helper/Minimize';
import { programHandle } from '../../helper/ProgramHandle';
import maple from "../../assets/maplestory-logo.png";

interface Props {
  mpsRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function MapleStore({ mpsRef, containerRef }:Props){

const { programs, setPrograms }: any = useContext(Programs);
const { tasks, setTask }: any = useContext(Tasks);
const isClicked = useRef<boolean>(false);
const coords = useRef<{startX: number , startY: number , lastX: number, lastY: number}>({
  startX: 0, 
  startY: 0,
  lastX: 0,
  lastY: 0
})

//anything pertaining to the draggable feature
useEffect(() => {
  dragDrop(mpsRef,containerRef,'maple-handle',coords,isClicked)
}, []);
  
//finds the index of the the task in the task object array
const currentTaskIndex = tasks.findIndex(
    (task: taskType) => task.name === "MapleStore"
  );

    return (
      <div
        ref={mpsRef}
        id='maplestore'
        style={tasks[currentTaskIndex]?.minimized ? { display: "none" } : {}}
      >
        <div id='maplestore-handle'>
            <div className="program">
                <img src={maple} alt="maple" />
                <p>Maple Store</p>
            </div>
          <div className='button-container'>
            <button onClick={() => minimizeProgram("MapleStore",tasks,setTask)}>
              <VscChromeMinimize size={20} />
            </button>
            <button id='exit-btn' onClick={() => programHandle("MapleStore", false, programs, tasks, setTask, setPrograms)}>
              <RxCross2 size={20} />
            </button>
          </div>
        </div>
        <iframe
          draggable={false}
          id='maplestore-window'
          src='https://lisa-go.github.io/shopping-cart/'
          style={{ height: "800px", width: "1400px" }}
        ></iframe>
      </div>
    );
}