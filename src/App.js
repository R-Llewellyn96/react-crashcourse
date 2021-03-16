import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import Footer from './components/Footer'

import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route  } from 'react-router-dom'

function App() {

    const [showAddTask, setShowAddTask] = useState(false)

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const getTasks = async () => {
            const taskFromServer = await fetchTasks()
            setTasks(taskFromServer)
        }

        getTasks()
    }, [])

    // Fetch Tasks from Backend
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()

        return data
    }

    // Fetch Task
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()

        return data
    }

    // Add Task
    const addTask = async (task) => {
        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = await res.json()

        setTasks([...tasks, data])

        /*
        const id = Math.floor(Math.random() * 10000) + 1

        const newTask = {id, ...task }
        setTasks([...tasks, newTask])

        console.log(task)
        console.log(id)
        */

    }

    // Delete Task
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
        })
        setTasks(tasks.filter((task) => task.id !== id))
        console.log('delete', id)
    }

    // Toggle Reminder
    const toggleReminder = async (id) => {

        const taskToToggle = await fetchTask(id)
        const updatedTask = {...taskToToggle,
            reminder: !taskToToggle.reminder}

            const res = await fetch(`http://localhost:5000/tasks/${id}`, {
                method: 'PUT',
                headers: {
                 'Content-type': 'application/json'
                },
                body: JSON.stringify(updatedTask)
            })

        const data = await res.json()



        setTasks(tasks.map((task) =>
                task.id === id ? {...task,
                    reminder: !task.reminder} : task
            )
        )
    }

    // Show Data
  return (
      <Router>
          <div className="container">
              <Header title='Planner' onAdd={() => setShowAddTask(!showAddTask)}
                      showAdd={showAddTask}/>

                      <Route path='/' exact render={(props) => (
                          <>
                              {showAddTask && <AddTask onAdd={addTask}/>}

                              { tasks.length > 0 ? (
                                  <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
                              ) : (
                                  'No Tasks Found'
                              )}

                          </>
                      )} />

                      <Route path='/about' component={About} />
                      <Footer />
          </div>
      </Router>
  );
}

export default App;
