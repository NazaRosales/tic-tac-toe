import './App.css'

const TURN = {
  x: 'x',
  o: 'o'
}
const BOARD = Array(9).fill(null);

const Squear = ({children, updateBoard, index}) =>{
  return (
    <div className='square'>
      {children}
    </div>
  )
} 
function App() {

  return (
    <main className='board'>
      <h1>hello word!</h1>
      <section className='game'>
        {
          BOARD.map( (cell, index)=>{
            return(
              <Squear key={index} index={index}>
                {index}
              </Squear>
            )
          })
        }
      </section>
    </main>
  )
}

export default App
