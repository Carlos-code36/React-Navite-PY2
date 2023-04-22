import React, { useEffect, useState }  from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { addPokemonFavoriteApi, isPokemonFavoriteApi, removePokemonFavoriteApi } from "../../api/favorite";
export default function Favorite({Id}) {
    const [ isFavorite, setIsFavorite ] = useState( undefined );
    const [reloadCheck, setReloadCheck] = useState(false);

    const Icon =isFavorite? FontAwesome:FontAwesome5

    useEffect( () => {
		( async () => {
			try {
				const response = await isPokemonFavoriteApi( Id );
				setIsFavorite( response )
			} catch (error) {
				setIsFavorite( false )
			}
		})();
	}, [ Id, reloadCheck ] )

    const onReloadCheckFavorite = () => {
        setReloadCheck((prev) => !prev);
      };

    const addFavorite = async() => {
        try {
            await addPokemonFavoriteApi(Id);
            onReloadCheckFavorite();
            
        } catch (error) {
            
        }

    }
    const removeFavorite = async() => {
		console.log( 'Eliminar de favoritos' )
        try {
            await removePokemonFavoriteApi(Id);
            onReloadCheckFavorite();
        } catch (error) {
            
        }
	}
    return (
        <Icon
            name='heart'
            color='#fff'
            size={20}
            onPress={() => isFavorite ? removeFavorite() : addFavorite()}
            style={{ marginRight: 20 }}

        />
    )
}