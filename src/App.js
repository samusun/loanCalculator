import { Slider, Box, Typography, Button } from '@mui/material';
import { useState, useEffect } from 'react';

function App() {
  const [amount, setAmount] = useState(110000);
  const [time, setTime] = useState(6);
  const [months, setMonths] = useState(72);
  const [cost, setCost] = useState(0);
  const yearlyInterest = 0.099;
  const monthlyInterest = yearlyInterest / 12;

  const updateAmount = (e) => {
    setAmount(e.target.value);
    calculateCost(e.target.value, months);
  };
  const updateTime = (e) => {
    setTime(e.target.value);
    setMonths(e.target.value * 12);
    calculateCost(amount, e.target.value * 12);
  };

  function calculateCost(Amount, Months) {
    let total =
      (Amount * monthlyInterest * Math.pow(1 + monthlyInterest, Months)) /
      (Math.pow(1 + monthlyInterest, Months) - 1);
    setCost(Math.round(total));
  }
  const sumMarks = [
    {
      value: 20000,
      label: '20 000 kr'
    },
    {
      value: 200000,
      label: '200 000 kr'
    }
  ];

  const timeMarks = [
    {
      value: 2,
      label: '2 år'
    },
    {
      value: 10,
      label: '10 år'
    }
  ];

  useEffect(() => {
    calculateCost(amount, months);
  });

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          width: '80vw'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <Typography
            sx={{
              fontSize: '1.6em',
              fontWeight: 'bold',
              marginLeft: '0'
            }}
          >
            Lånekalkyl
          </Typography>

          <Typography
            sx={{
              backgroundColor: 'purple',
              color: 'white',
              padding: '20px'
            }}
          >
            Exempel på lånekostnad <br /> {cost} SEK / mån
          </Typography>
        </Box>

        <Typography
          sx={{
            marginBottom: '3.5vh',
            fontWeight: 'bold'
          }}
        >
          Lånebelopp
        </Typography>
        <Slider
          sx={{
            height: 16
          }}
          value={amount}
          onChange={(e) => updateAmount(e)}
          marks={sumMarks}
          aria-label='Always visible'
          color='secondary'
          valueLabelDisplay='on'
          step={10000}
          min={20000}
          max={200000}
        />
        <Typography
          sx={{
            fontWeight: 'bold',
            marginBottom: '3.5vh'
          }}
        >
          Lånetid
        </Typography>
        <Slider
          sx={{
            height: 16
          }}
          value={time}
          marks={timeMarks}
          onChange={(e) => updateTime(e)}
          aria-label='Always visible'
          color='secondary'
          valueLabelDisplay='on'
          step={1}
          min={2}
          max={10}
        />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            variant='contained'
            color='success'
            onClick={() =>
              console.log(
                `/loan-application/?amount=${amount}&months=${months}`
              )
            }
            sx={{
              fontWeight: 'bold'
            }}
          >
            Till Ansökan
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
