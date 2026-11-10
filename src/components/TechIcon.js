import React from 'react';
import {
  SiSpringboot,
  SiApachekafka,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiDatadog,
  SiElasticsearch,
  SiFlutter,
  SiDart,
  SiGo,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiRabbitmq,
  SiMysql,
  SiGitlab,
  SiGithubactions,
  SiGrafana,
} from 'react-icons/si';
import {
  FaJava,
  FaAws,
  FaServer,
  FaDatabase,
  FaShieldAlt,
  FaNetworkWired,
  FaMicrochip,
  FaCodeBranch,
  FaTerminal,
  FaCheckCircle,
} from 'react-icons/fa';

export const TechIcon = ({ name, className = 'w-5 h-5' }) => {
  const iconKey = (name || '').toLowerCase().trim();

  if (iconKey.includes('java') && !iconKey.includes('script')) return <FaJava className={className} />;
  if (iconKey.includes('spring')) return <SiSpringboot className={className} />;
  if (iconKey.includes('kafka')) return <SiApachekafka className={className} />;
  if (iconKey.includes('postgre')) return <SiPostgresql className={className} />;
  if (iconKey.includes('mongo')) return <SiMongodb className={className} />;
  if (iconKey.includes('redis')) return <SiRedis className={className} />;
  if (iconKey.includes('docker')) return <SiDocker className={className} />;
  if (iconKey.includes('kuber')) return <SiKubernetes className={className} />;
  if (iconKey.includes('datadog')) return <SiDatadog className={className} />;
  if (iconKey.includes('elastic')) return <SiElasticsearch className={className} />;
  if (iconKey.includes('flutter')) return <SiFlutter className={className} />;
  if (iconKey.includes('dart')) return <SiDart className={className} />;
  if (iconKey.includes('go')) return <SiGo className={className} />;
  if (iconKey.includes('react')) return <SiReact className={className} />;
  if (iconKey.includes('tailwind')) return <SiTailwindcss className={className} />;
  if (iconKey.includes('type')) return <SiTypescript className={className} />;
  if (iconKey.includes('script') || iconKey.includes('js')) return <SiJavascript className={className} />;
  if (iconKey.includes('rabbit')) return <SiRabbitmq className={className} />;
  if (iconKey.includes('mysql')) return <SiMysql className={className} />;
  if (iconKey.includes('gitlab')) return <SiGitlab className={className} />;
  if (iconKey.includes('action') || iconKey.includes('ci/cd') || iconKey.includes('cicd')) return <SiGithubactions className={className} />;
  if (iconKey.includes('grafana') || iconKey.includes('kibana')) return <SiGrafana className={className} />;
  if (iconKey.includes('aws')) return <FaAws className={className} />;
  if (iconKey.includes('shield') || iconKey.includes('jwt') || iconKey.includes('security')) return <FaShieldAlt className={className} />;
  if (iconKey.includes('data') || iconKey.includes('sql')) return <FaDatabase className={className} />;
  if (iconKey.includes('api') || iconKey.includes('network') || iconKey.includes('stream')) return <FaNetworkWired className={className} />;
  if (iconKey.includes('device') || iconKey.includes('microchip') || iconKey.includes('iot')) return <FaMicrochip className={className} />;
  if (iconKey.includes('git') || iconKey.includes('review') || iconKey.includes('pr')) return <FaCodeBranch className={className} />;
  if (iconKey.includes('terminal')) return <FaTerminal className={className} />;
  if (iconKey.includes('check')) return <FaCheckCircle className={className} />;

  return <FaServer className={className} />;
};

export default TechIcon;
