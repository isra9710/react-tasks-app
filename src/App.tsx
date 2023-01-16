import React, { useState, useRef} from 'react';
import 'bootswatch/dist/lumen/bootstrap.min.css'
type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewtask] = useState<string>('')
  const [tasks, setTasks] = useState<ITask[]>([])
  const taskInput = useRef<HTMLInputElement>(null);



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(newTask)
    console.log(newTask)
    setNewtask('');
    taskInput.current?.focus();
  }


  const addTask = (name: string):void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }]
    setTasks(newTasks)
  }

  const toggleDoneTask = (i:number):void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done =  !newTasks[i].done;
    setTasks(newTasks);
  }

  const removeTask = (i:number):void =>{
    console.log(i)
    const newTasks:ITask[] = [...tasks];
    newTasks.splice(i,1);
    setTasks(newTasks);
  }


   return (
      <div className='container p-4'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <div className='card'>
              <div className='card-body'>
                <form action="" onSubmit={handleSubmit}>
                  <input 
                  type="text" 
                  onChange={e => setNewtask(e.target.value)} 
                  value={newTask} 
                  className='form-control'
                  ref={taskInput}
                  autoFocus
                  />
                  <button className='btn btn-success btn-block mt-2'>
                    Save
                  </button>
                </form>
              </div>
            </div>
            {tasks.map((t: ITask, i: number) =>(                
                <div className='card card-body mt-2'>
                  <h2 style={{textDecoration:t.done ? 'line-through':'' }}>{t.name}</h2>
                  <p>{t.done}</p>
                  <div>
                    <button className='btn btn-secondary' onClick={() =>toggleDoneTask(i)}>
                      {t.done ? '✅':'❌'}
                    </button>
                    <button className='btn btn-danger' onClick={() => removeTask(i)}>
                      🗑
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

      </div>
  );
}

export default App;
