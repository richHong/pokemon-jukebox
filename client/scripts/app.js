
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
        } else if (that.prop.name === 'mankey'){
          compareName = 'mankey2';
        }
        if (trackName === compareName || trackName === '0'+that.props.id+' - '+compareName) {
          SC.oEmbed(track.uri, {maxheight:81, auto_play:true}, document.getElementById('player'));
        }
      }, this)
    })
  },
  render:function(){
    return (
          <div id="pokemon">
            <h3>{this.props.name}</h3>
            <img src={this.props.img}/>
            <p>{this.props.id}</p>
            <button id="battle" onClick={this.getTrack}>Battle Cry!</button>
          </div>
      )   
  }
});

var Pokedex = React.createClass({
  getInitialState: function(){
      var that = this;
    $.getJSON('http://api.soundcloud.com/resolve?url=https://soundcloud.com/richard-hong-111605706/sets/pokemon&client_id=a5b75fc5d7251916a7c1e16fb662e932', function(data){
      _.each(data.tracks, function(track){
        if (track.title.toLowerCase() === 'Pokemon Theme Song FULL'.toLowerCase()){
          SC.oEmbed(track.uri, {maxheight:81, auto_play:false}, document.getElementById('player'));
        }
      }, this)
    })
    var pokeList = [];
    return {
      pokeList:pokeList
    }
  },
  sortPokemon:function(){
    this.state.pokeList.sort(function(a,b){return a.id - b.id});
  },
  getPokemon:function(){
    var pokeList = [];
    var that = this
    var n = $('#textbox').val()
    console.log(n);
    for (var i = 1; i < n+1; i++){
      $.getJSON('http://pokeapi.co/api/v2/pokemon-form/'+i, function(pokemon){
        pokeList.push(pokemon);
        that.setState({pokeList:pokeList})
        that.sortPokemon();
      }, this);
    }
  },
  render:function(){
    return (
      <div>
        <div>
          <h1>Pokedex</h1>
          <input type="text" id="textbox" placeholder="How Many Pokemon?"/>
          <button id="get" onClick={this.getPokemon}>Get Pokemon!</button>
        </div>
        <div>
          {this.state.pokeList.map(function(pokemon, i){
              return (
                <Pokemon
                  key={i}
                  img={pokemon.sprites.front_default} 
                  name={pokemon.name}
                  id={pokemon.id}>
                </Pokemon>
              )
          }, this)}
        </div>
      </div>
      )
  }
});


ReactDOM.render(<Pokedex/>, document.getElementById('container'));