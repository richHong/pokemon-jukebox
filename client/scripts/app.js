var Pokemon = React.createClass({
  render:function(){
    return (
          <div id="pokemon">
            <h3>{this.props.name}</h3>
            <img src={this.props.img}/>
            <p>{this.props.id}</p>
          </div>
      )   
  }
});

var Pokedex = React.createClass({
  getInitialState: function(){
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
    for (var i = 1; i < 152; i++){
      $.getJSON('http://pokeapi.co/api/v2/pokemon-form/'+i, function(pokemon){
        console.log(pokemon)
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
          <button onClick={this.getPokemon}>Get 151 Pokemon!</button>
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