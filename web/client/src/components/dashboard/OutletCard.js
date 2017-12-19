import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Switch from 'material-ui/Switch';
import RC2 from 'react-chartjs2';

import Delete from './Delete';
import Update from './Update';

import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import RefreshIcon from 'material-ui-icons/Refresh';

function constructLabels(data){
  var dates = data.map((a) => {
    return new Date(a.event_time);
  });
  let numberLabels = 20;
  let interval = Math.floor(dates.length / numberLabels);
  let labels = dates.map((date, index, arr) => {
    if(index % interval == 0){
      return date.getHours() + "h" + date.getMinutes();
    }else{
      return '';
    }
  });
  return labels;
}

function extractData(data){
  return data.map(a => {
    return a.sensor_value;
  });
}


const OutletCard = ({ alias, handleChangeStateOutlet, handleDeleteOutlet, handleUpdateOutlet, handleDataRequest, id, state, data }) =>{
  let labs = constructLabels(data);
  let values = extractData(data);
  const data2 = {
    labels: labs,
    datasets: [
      {
        label: 'Consommation',
        fill: false,
        lineTension: 0.2,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: values,
      }
    ]
  };
  

  return (<Card>
    <CardHeader
      action={
        <Tooltip title="Allumer/Éteindre la prise" placement="bottom">
          <Switch
            checked={state}
            onChange={handleChangeStateOutlet}
            aria-label="Allumer/Éteindre la prise"
          />
        </Tooltip>
      }
      title={(alias) ? alias : id}
      subheader={id}
    />
    <CardContent>
      <RC2 data={data2} type='line' />
    </CardContent>
    <CardActions disableActionSpacing>
      <Tooltip placement="bottom" title="Mettre à jour les données de la prise">
        <IconButton aria-label="Mettre à jour les données de la prise" onClick={handleDataRequest}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
      <Update initialValues={{alias}} id={id} onSubmit={handleUpdateOutlet} />
      
      <Delete id={id} handleDelete={handleDeleteOutlet} />
    </CardActions>
  </Card>);
}

OutletCard.PropTypes = {
  alias: PropTypes.string.isRequired,
  handleChangeStateOutlet: PropTypes.func.isRequired,
  handleDeleteOutlet: PropTypes.func.isRequired,
  handleUpdateOutlet: PropTypes.func.isRequired,
  handleDataRequest: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  data : PropTypes.array.isRequired
};

export default OutletCard;
