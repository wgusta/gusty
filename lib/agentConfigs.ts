export interface AgentConfig {
  id: string;
  title: string;
  description?: string;
  filename: string;
  platform: 'chatgpt' | 'claude';
}

export const chatgptConfigs: AgentConfig[] = [
  {
    id: 'browser-agent-prompt-job',
    title: 'Browser-Based Job Application Material Generation',
    description: 'Prompt for generating complete, tailored application documents for a specific job opening using browser-based tools.',
    filename: 'browser-agent-prompt-job.md',
    platform: 'chatgpt',
  },
  {
    id: 'job-agent-setup-chatgpt',
    title: 'Job Agent Setup for ChatGPT',
    description: 'Multi-GPT HTML Application System setup guide for ChatGPT Custom GPTs.',
    filename: 'Job-Agent-Setup_ChatGPT.md',
    platform: 'chatgpt',
  },
  {
    id: 'local-agent-prompt-job',
    title: 'Generic Automated Job Application Material Generation',
    description: 'Prompt for creating complete application documents with automated folder creation and file management.',
    filename: 'local-agent-prompt-job.md',
    platform: 'chatgpt',
  },
];

export const claudeConfigs: AgentConfig[] = [
  {
    id: 'communications-strategist',
    title: 'Communications Strategist Agent',
    description: 'TELOS-driven positioning strategy agent (Bold > Compromise).',
    filename: 'communications-strategist.md',
    platform: 'claude',
  },
  {
    id: 'hr-business-partner',
    title: 'HR Business Partner Agent',
    description: 'Honest matching + CV optimization using CAR method.',
    filename: 'hr-business-partner.md',
    platform: 'claude',
  },
  {
    id: 'job-file-generator',
    title: 'Job File Generator',
    description: 'Creates dated folders and writes application files. No content generation.',
    filename: 'job-file-generator.md',
    platform: 'claude',
  },
  {
    id: 'job-sourcer',
    title: 'Job Sourcer Agent',
    description: 'Daily job discovery across multiple platforms (LinkedIn, jobs.ch, medienjobs, job-room.ch).',
    filename: 'job-sourcer.md',
    platform: 'claude',
  },
  {
    id: 'network-mapper-agent',
    title: 'Network Mapper Agent',
    description: 'LinkedIn warm intro pathfinding specialist.',
    filename: 'network-mapper-agent.md',
    platform: 'claude',
  },
  {
    id: 'salary-intelligence-agent',
    title: 'Salary Intelligence Agent',
    description: 'Swiss market research + negotiation strategy.',
    filename: 'salary-intelligence-agent.md',
    platform: 'claude',
  },
  {
    id: 'writing-style-agent',
    title: 'Writing Style Agent',
    description: 'Final polish: Active voice + Strong verbs + Authentic voice.',
    filename: 'writing-style-agent.md',
    platform: 'claude',
  },
];

export async function loadAgentConfig(config: AgentConfig): Promise<string> {
  const response = await fetch(`/agent-configs/${config.platform}/${config.filename}`);
  if (!response.ok) {
    throw new Error(`Failed to load ${config.filename}`);
  }
  return await response.text();
}

