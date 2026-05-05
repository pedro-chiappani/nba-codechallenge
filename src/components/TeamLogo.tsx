import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import {SvgCssUri, SvgUri} from 'react-native-svg';
import {getTeamLogo} from '../utils/teamLogos';

interface TeamLogoProps {
  uri: string;
  teamName: string;
  primaryColor: string;
  secondaryColor: string;
  teamKey: string;
}

const TeamLogo: React.FC<TeamLogoProps> = ({
  uri,
  teamKey,
  teamName,
  primaryColor,
  secondaryColor,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [svgFailed, setSvgFailed] = useState(false);

  // Obtener iniciales del nombre del equipo
  const getInitials = (name: string) => {
    const words = name.split(' ');
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return words
      .slice(0, 2)
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  // Obtener logo local como fallback
  const localLogo = getTeamLogo(teamName);

  // Timeout para el SVG - si tarda más de 3 segundos, usa fallback
  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        if (isLoading) {
          setSvgFailed(true);
          setIsLoading(false);
        }
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  // Si el SVG falló y tenemos logo local, usarlo
  if (svgFailed && localLogo) {
    return (
      <View style={styles.logoContainer}>
        <Image
          source={localLogo}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
    );
  }

  // Si ambos fallaron, mostrar fallback con iniciales y nombre
  if (hasError && !localLogo) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={[styles.fallbackText, {color: `#${secondaryColor}`}]}>
          {getInitials(teamName)}
        </Text>
        <Text style={[styles.teamNameText, {color: `#${secondaryColor}`}]}>
          {teamName}
        </Text>
      </View>
    );
  }

  // Intentar cargar el SVG desde la API primero usando SvgUri (más compatible)
  return (
    <View style={styles.logoContainer}>
      <SvgCssUri
        uri={uri}
        width="100%"
        height="100%"
        onLoad={() => {
          setIsLoading(false);
          setSvgFailed(false);
        }}
        onError={() => {
          setSvgFailed(true);
          setIsLoading(false);
          //   Si el SVG falla pero no tenemos logo local, mostrar fallback
          if (!localLogo) {
            setHasError(true);
          }
        }}
      />
      {/* Mientras carga, mostrar iniciales pequeñas */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, {color: `#${secondaryColor}`}]}>
            {getInitials(teamName)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: '80%',
    height: '80%',
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fallbackText: {
    fontSize: 64,
    fontWeight: 'bold',
    opacity: 0.4,
    letterSpacing: 4,
  },
  teamNameText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    opacity: 0.6,
    textAlign: 'center',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  loadingText: {
    fontSize: 48,
    fontWeight: 'bold',
    opacity: 0.3,
  },
});

export default TeamLogo;
