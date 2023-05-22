import { useEffect, useState } from "react";
import Joyride, { Step } from 'react-joyride';

const Onboarding: React.FC = () => {
    const [tourRunning, setTourRunning] = useState<boolean>(false)

    const tourSteps: Step[] = [
        {
          target: '#navbar',
          content: 'This is ths nav bar',
          disableBeacon: true
          // ... additional options
        },
        {
          target: '#onboard-button',
          content: 'This is the onboard button',
          // ... additional options
        },
        // ... add more steps as needed
    ];

    useEffect(() => {
        setTourRunning(true)
    }, [])

    return (
        <>
            <Joyride
            steps={tourSteps}
            run={tourRunning}
            continuous={true}
            showProgress={true}
            styles={{
                options: {
                  arrowColor: '#e3ffeb',
                  backgroundColor: '#e3ffeb',
                  overlayColor: 'rgba(79, 26, 0, 0.4)',
                  primaryColor: '#000',
                  textColor: '#004a14',
                  width: 500,
                  zIndex: 1000,
                }
              }}
            // ... additional options
            />
        </>
    )
}
export default Onboarding