import GitHubCalendar from 'react-github-calendar';

const GitHubCard = () => {
  
  const explicitTheme = {
    light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  return (
    <div className="w-full max-w-2xl bg-[#0d1117] text-white p-6 rounded-2xl border border-gray-800 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-400">@s0urfphyu</h3>
        <span className="text-xs text-gray-500">Contribution settings</span>
      </div>
      
      <div className="overflow-x-auto custom-scrollbar">
        <GitHubCalendar 
          username="Yusuf-Rizqy-M" 
          theme={explicitTheme}
          labels={{
            totalCount: '{{count}} contributions in the last year',
          }}
          fontSize={12}
          blockSize={12}
          blockMargin={4}
        />
      </div>
    </div>
  );
};

export default GitHubCard;