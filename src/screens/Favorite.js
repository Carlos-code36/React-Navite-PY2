import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, Text, Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getPokemonsFavoriteApi } from "../api/favorite";
import { getPokemonDetailsApi } from "../api/pokemon"
import PokemonList from "../components/PokemonList";
import useAuth from "../hooks/useAuth"
import NoLogged from "../components/Nologged";

export default function Favorite() {
  const [pokemon, setPokemon] = useState([]);
  const { auth } = useAuth();
  
  useFocusEffect(
    useCallback(() => {
      if (auth) {
        (async () => {
          const response = await getPokemonsFavoriteApi();
          console.log("🚀 ~ file: Favorite.js:17 ~ response:", response)
          const pokemonArray = [];
          for await (const id of response) {
            const pokemonDetails = await getPokemonDetailsApi(id)
            pokemonArray.push({
                id:pokemonDetails.id,
                name:pokemonDetails.name,
                type:pokemonDetails.types[0].type.name,
                order:pokemonDetails.order,
                image:pokemonDetails.sprites.other["official-artwork"].front_default,
            })
          }
          setPokemon(pokemonArray)
        })();
      }
  
    }, [auth])
  )


  return !auth ? (
    <NoLogged></NoLogged>
  ) :
    (
      <PokemonList
			pokemons = { pokemon }
		/>
    );
}