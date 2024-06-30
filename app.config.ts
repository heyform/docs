export default defineAppConfig({
  shadcnDocs: {
    site: {
      name: 'HeyForm Help Center',
      description: 'Get the most out of HeyForm with our detailed help center guides and practices.',
    },
    theme: {
      customizable: false,
      color: 'Blue',
      radius: 0.5,
    },
    header: {
      title: 'HeyForm Help Center',
      showTitle: true,
      darkModeToggle: true,
      logo: {
        light: '/logo.svg',
        dark: '/logo-dark.svg',
      },
      nav: [],
      links: [{
        icon: 'lucide:github',
        to: 'https://github.com/heyform/docs',
        target: '_blank',
      }],
    },
    aside: {
      useLevel: true,
      collapse: false,
    },
    main: {
      breadCrumb: true,
      showTitle: true,
    },
    footer: {
      credits: 'Copyright HeyForm © 2024',
      links: [{
        icon: 'lucide:github',
        to: 'https://github.com/heyform/docs',
        target: '_blank',
      }],
    },
    toc: {
      enable: true,
      title: 'On This Page',
      links: [{
        title: 'Star on GitHub',
        icon: 'lucide:star',
        to: 'https://go.heyform.net/github',
        target: '_blank',
      }, {
        title: 'Create Issues',
        icon: 'lucide:circle-dot',
        to: 'https://go.heyform.net/issue',
        target: '_blank',
      }, {
        title: 'Chat on Discord',
        icon: 'simple-icons:discord',
        to: 'https://go.heyform.net/discord',
        target: '_blank',
      }, {
        title: 'Become a Sponsor',
        icon: 'lucide:hand-heart',
        to: 'https://go.heyform.net/sponsor',
        target: '_blank',
      }],
    },
    search: {
      enable: true,
      inAside: false,
    }
  }
});