var Pokemon = React.createClass({
  getTrack:function(){
    var that = this;
    $.getJSON('http://api.soundcloud.com/resolve?url=https://soundcloud.com/richard-hong-111605706/sets/pokemon&client_id=a5b75fc5d7251916a7c1e16fb662e932', function(data){
      _.each(data.tracks, function(track){
        var trackName = track.title.toLowerCase();
        var compareName = that.props.name;
        if (that.props.name === 'nidoran-f'){
          compareName = 'nidoran';
        } else if (that.props.name === 'nidoran-m'){
          compareName = 'nidoran';
        } else if (that.props.name === 'diglett'){
          compareName = 'diglett1';
        } else if (that.props.name === 'mankey'){
          compareName = 'mankey2';
        } else if (that.props.name === 'primeape'){
          compareName = 'primeape4';
        } else if (that.props.name === 'farfetchd'){
          compareName = "farfetch'd";
        } else if (that.props.name === 'vulpix'){
          compareName = 'vulpix!';
        } else if (that.props.name === 'mr-mime'){
          compareName = 'mr. mime';
        }
        if (trackName === compareName || trackName === ('0'+that.props.id+' - '+compareName) || trackName === (that.props.id+' - '+compareName)) {
          SC.oEmbed(track.uri, {maxheight:81, auto_play:true}, document.getElementById('player'));
        }
      }, this)
    })
  },
  render:function(){
    return (
          <div className="pokemon">
            <h1>{this.props.name}</h1>
            <img className="pic" src={this.props.img}/>
            <p>#{this.props.id}</p>
            <span>Type:</span><br/>
            {this.props.types.map(function(data, i){
              return <div key={i}><span>{i+1}.{data.type.name}</span><br/></div>
            })}
            <button className="battle" onClick={this.getTrack}>Battle Cry!</button>
          </div>
      )   
  }
});

var Pokedex = React.createClass({
  getInitialState: function(){
    this.loadThemeSong();
    var pokeList = [];
    return {
      pokeList:pokeList,
      pokeNames:[],
      spinner:false
    }
  },
  componentWillMount:function(){
    var that = this;
    $.get('/api/pokemon', function(data){
      that.setState({pokeNames: data})
    })
  },
  loadThemeSong:function(){
    var that = this;
    $.getJSON('http://api.soundcloud.com/resolve?url=https://soundcloud.com/richard-hong-111605706/sets/pokemon&client_id=a5b75fc5d7251916a7c1e16fb662e932', function(data){
      _.each(data.tracks, function(track){
        if (track.title.toLowerCase() === 'Pokemon Theme Song FULL'.toLowerCase()){
          SC.oEmbed(track.uri, {maxheight:81, auto_play:false}, document.getElementById('player'));
        }
      }, this);
    });
  },
  sortPokemon:function(){
    this.state.pokeList.sort(function(a,b){return a.id - b.id});
  },
  getPokemon:function(){
    var pokeList = [];
    var that = this
    var number = parseInt($('#select').val())
    this.setState({spinner:true})
    $.getJSON('http://pokeapi.co/api/v2/pokemon/'+number, function(pokemon){
      pokeList.push(pokemon);
      that.setState({pokeList: that.state.pokeList.concat(pokeList)});
      that.sortPokemon();
      that.setState({spinner:false})
    }, this);
    
  },
  render:function(){
    return (
      <div>
        <div className="pokemon-container">
          <img id="logo" src="http://vignette3.wikia.nocookie.net/logopedia/images/e/e5/Pokemon_logo.png/revision/latest?cb=20120128115827" onClick={this.loadThemeSong}/>
          <select id="select">
            { this.state.pokeNames.length > 0 ? this.state.pokeNames.map(function(pokemon){
              return <option key={ pokemon.id } value={ pokemon.id.toString() }>{ pokemon.id}. { pokemon.name }</option>
            }) : null }
          </select>
          <button id="get" onClick={this.getPokemon}>Get Pokemon</button>
        </div>
        {this.state.spinner ? <img className='spinner' src='../spinner.gif'/> : null}
        <div id="box">
          { this.state.pokeList.map(function(pokemon, i){
              return (
                <Pokemon
                  key={i}
                  img={pokemon.sprites.front_default} 
                  name={pokemon.name}
                  id={pokemon.id}
                  types={pokemon.types}>
                </Pokemon>
              )
          }, this)}
        </div>
      </div>
      )
  }
});


ReactDOM.render(<Pokedex/>, document.getElementById('container'));