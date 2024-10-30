import CuteTaskManagerCard from "./components/ui/task-manager-card"
import { BackgroundGradientAnimation } from "./components/ui/background-gradient-animation"
function App() {


  return (
    <>

<BackgroundGradientAnimation
  gradientBackgroundStart="rgb(108, 0, 162)"  
  gradientBackgroundEnd="rgb(0, 17, 82)"
  firstColor="18, 113, 255"
  secondColor="221, 74, 255"
  thirdColor="100, 220, 255"
  fourthColor="200, 50, 50"
  fifthColor="180, 180, 50"
  pointerColor="140, 100, 255"
  size="80%"
  blendingValue="hard-light"
  containerClassName="h-screen w-screen"
>
  <CuteTaskManagerCard />
</BackgroundGradientAnimation>
    </>
  )
}

export default App
