import React from 'react';
import { Slide } from '../components/Slide.jsx';
import { Terminal } from '../components/Terminal.jsx';
import { config } from '../config.js';
import DecryptedText from '../components/react-bits/DecryptedText/DecryptedText.jsx';
import BlurText from '../components/react-bits/BlurText/BlurText.jsx';

export const slides = [
  // Slide 1: Title
  {
    color: "cyan",
    component: ({ active }) => (
      <Slide active={active} color="cyan" alignCenter>
        <div className="speaker-badge stagger d-1" style={{ marginBottom: '2rem' }}>
          <div className="speaker-avatar"><i className={`fa-solid ${config.speaker.avatarIcon}`}></i></div>
          {config.speaker.role} // {config.speaker.name}
        </div>
        <h1 className="title-massive text-gradient grad-cyan stagger d-2">
          <DecryptedText key={active ? 'active' : 'inactive'} playAudio={active} text={config.presentation.title} animateOn="view" speed={40} maxIterations={3} sequential={true} />
        </h1>
        <BlurText
          key={active ? 'active' : 'inactive'}
          text={config.presentation.subtitle}
          delay={100}
          animateBy="words"
          direction="bottom"
          className="stagger d-3"
          style={{ maxWidth: '900px', fontSize: '2rem' }}
        />
        <div className="glass-panel stagger d-4" style={{ padding: '1rem 2rem', borderRadius: '50px', marginTop: '2rem' }}>
          <span className="mono" style={{ color: 'var(--cyan)', fontSize: '1rem' }}>
            [ <i className="fa-solid fa-network-wired"></i> systemctl start networking.service ]
          </span>
        </div>
      </Slide>
    )
  },
  // Slide 2: Domains & ICANN
  {
    color: "purple",
    component: ({ active }) => (
      <Slide active={active} color="purple">
        <h2 className="slide-title text-gradient grad-purple stagger d-1">
          <i className="fa-solid fa-address-book"></i> The Domain Market
        </h2>
        <div className="grid-2">
          <div className="flex-col-gap stagger d-2">
            <div className="glass-panel" style={{ borderLeft: '4px solid var(--purple)' }}>
              <h3 style={{ color: 'var(--purple)' }}>What is a Domain?</h3>
              <p>Humans can't memorize IPs like <span className="mono">142.250.190.46</span>. Domains act as aliases.</p>
            </div>
            <div className="glass-panel" style={{ borderLeft: '4px solid var(--emerald)' }}>
              <h3 style={{ color: 'var(--emerald)' }}>ICANN</h3>
              <p>The <strong>Internet Corporation for Assigned Names and Numbers</strong>. They are the supreme non-profit governing body that controls the root DNS servers and delegates TLDs (.com, .org, .in).</p>
            </div>
          </div>
          <div className="glass-panel stagger d-3" style={{ textAlign: 'center', borderColor: 'var(--amber)' }}>
            <i className="fa-solid fa-store" style={{ fontSize: '3rem', color: 'var(--amber)', marginBottom: '1rem' }}></i>
            <h3 style={{ color: '#fff' }}>Domain Brokers (Registrars)</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>You don't <em>buy</em> a domain, you rent it.</p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>Companies like GoDaddy, Namecheap, and Cloudflare are essentially real-estate brokers. They pay a fixed fee to ICANN to register your name in the global registry for a specific duration.</p>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 3: The .ai Boom
  {
    color: "rose",
    component: ({ active }) => (
      <Slide active={active} color="rose" alignCenter>
        <h2 className="slide-title text-gradient grad-rose stagger d-1" style={{ justifyContent: 'center' }}>
          <i className="fa-solid fa-earth-americas"></i> The Domain Hack: .ai
        </h2>
        <div className="grid-2" style={{ width: '100%', maxWidth: '1200px', marginTop: '2rem' }}>
          <div className="glass-panel stagger d-2" style={{ padding: '3rem', textAlign: 'center', borderTop: '4px solid var(--emerald)' }}>
            <i className="fa-solid fa-umbrella-beach icon-massive" style={{ color: 'var(--emerald)' }}></i>
            <h3 style={{ color: '#fff', marginBottom: '1rem' }}>The Origin (ccTLD)</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              <span className="mono text-gradient grad-emerald" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>.ai</span> was created as a <strong>Country Code TLD</strong> exclusively for the tiny Caribbean island of <strong>Anguilla</strong>.
            </p>
          </div>
          <div className="glass-panel stagger d-3" style={{ padding: '3rem', textAlign: 'center', borderTop: '4px solid var(--purple)' }}>
            <i className="fa-solid fa-microchip icon-massive" style={{ color: 'var(--purple)' }}></i>
            <h3 style={{ color: '#fff', marginBottom: '1rem' }}>The Boom (gTLD)</h3>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Repurposed by the <strong>Artificial Intelligence</strong> boom, Anguilla now makes tens of millions of dollars just from tech companies renting their country's domain!
            </p>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 4: The Global Phonebook (DNS Core)
  {
    color: "purple",
    component: ({ active }) => (
      <Slide active={active} color="purple">
        <h2 className="slide-title text-gradient grad-purple stagger d-1">
          <i className="fa-solid fa-address-book"></i> The Global Phonebook
        </h2>
        <div className="diagram-flex stagger d-2">
          <div className="node" style={{ borderColor: 'var(--purple)', boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)' }}>
            <i className="fa-solid fa-laptop-code" style={{ color: 'var(--purple)' }}></i>
            <h3 className="node-title">Browser</h3>
            <div className="mono node-sub">google.com</div>
          </div>
          <div className="arrow"><i className="fa-solid fa-arrow-right-arrow-left"></i></div>
          <div className="node" style={{ borderColor: 'var(--cyan)', boxShadow: '0 0 20px rgba(0, 242, 254, 0.2)' }}>
            <i className="fa-solid fa-server" style={{ color: 'var(--cyan)' }}></i>
            <h3 className="node-title">DNS (1.1.1.1)</h3>
            <div className="mono node-sub">UDP Port 53</div>
          </div>
          <div className="arrow"><i className="fa-solid fa-arrow-right"></i></div>
          <div className="node" style={{ borderColor: 'var(--emerald)', boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)' }}>
            <i className="fa-solid fa-globe" style={{ color: 'var(--emerald)' }}></i>
            <h3 className="node-title">Target Server</h3>
            <div className="mono node-sub">142.250.190.46</div>
          </div>
        </div>
        <div className="grid-2" style={{ marginTop: '2rem' }}>
          <div className="glass-panel stagger d-3">
            <h3 style={{ color: 'var(--purple)' }}>DNS Resolution</h3>
            <p>Translates aliases (google.com) to routable network coordinates.</p>
            <h3 style={{ color: 'var(--cyan)', marginTop: '1.5rem' }}>Distributed Registry</h3>
            <p>No single server holds every domain. The query bounces across servers globally to find the answer.</p>
          </div>
          <div className="glass-panel stagger d-4" style={{ borderLeft: '4px solid var(--amber)' }}>
            <h3 style={{ color: 'var(--amber)' }}><i className="fa-solid fa-flask"></i> Micro-Lab: nslookup</h3>
            <p>Let's unmask the IP behind a domain right now.</p>
            <Terminal active={active} cmd="nslookup discord.com" staggerClass="stagger d-5" fontSize="0.9rem">
              <div style={{ color: 'var(--text-muted)' }}>Server:     1.1.1.1</div>
              <div style={{ color: 'var(--text-muted)' }}>Address:    1.1.1.1#53</div>
              <br />
              <div style={{ color: 'var(--text-muted)' }}>Non-authoritative answer:</div>
              <div style={{ color: 'var(--emerald)' }}>Name:   discord.com</div>
              <div style={{ color: 'var(--rose)' }}>Address: 162.159.136.232</div>
            </Terminal>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 5: DNS Hierarchy & Traceroute
  {
    color: "cyan",
    component: ({ active }) => (
      <Slide active={active} color="cyan">
        <h2 className="slide-title text-gradient grad-cyan stagger d-1">
          <i className="fa-solid fa-sitemap"></i> DNS Resolution Hierarchy
        </h2>
        <div className="diagram-flex stagger d-2" style={{ marginBottom: '3rem' }}>
          <div className="node" style={{ borderColor: 'var(--purple)', boxShadow: '0 0 20px rgba(168,85,247,0.2)' }}>
            <i className="fa-solid fa-server" style={{ color: 'var(--purple)' }}></i>
            <h3 className="node-title">Root Server</h3>
            <div className="mono node-sub">"."</div>
          </div>
          <div className="arrow"><i className="fa-solid fa-arrow-right"></i></div>
          <div className="node" style={{ borderColor: 'var(--cyan)', boxShadow: '0 0 20px rgba(0,242,254,0.2)' }}>
            <i className="fa-solid fa-server" style={{ color: 'var(--cyan)' }}></i>
            <h3 className="node-title">TLD Server</h3>
            <div className="mono node-sub">".com"</div>
          </div>
          <div className="arrow"><i className="fa-solid fa-arrow-right"></i></div>
          <div className="node" style={{ borderColor: 'var(--emerald)', boxShadow: '0 0 20px rgba(16,185,129,0.2)' }}>
            <i className="fa-solid fa-server" style={{ color: 'var(--emerald)' }}></i>
            <h3 className="node-title">Authoritative</h3>
            <div className="mono node-sub">"google.com"</div>
          </div>
        </div>
        <div className="grid-2">
          <div className="glass-panel stagger d-3">
            <h3 style={{ color: 'var(--cyan)' }}>The Recursive Journey</h3>
            <p>When your browser asks <code>1.1.1.1</code> for google.com, it walks down this tree automatically, caching the result to speed up future requests.</p>
          </div>
          <div className="glass-panel stagger d-4" style={{ borderLeft: '4px solid var(--amber)' }}>
            <h3 style={{ color: 'var(--amber)' }}><i className="fa-solid fa-route"></i> Live Lab: Traceroute</h3>
            <p style={{ marginBottom: '1rem' }}>Let's see the physical path your packets take.</p>
            <Terminal active={active} cmd="traceroute 1.1.1.1" staggerClass="stagger d-5">
              <div style={{ color: 'var(--text-muted)' }}>1  192.168.1.1 (Router)  2.1ms</div>
              <div style={{ color: 'var(--text-muted)' }}>2  10.32.4.1 (ISP Gateway)  14.3ms</div>
              <div style={{ color: 'var(--emerald)' }}>3  1.1.1.1 (Cloudflare)  18.5ms</div>
            </Terminal>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 6: The IPv4 vs IPv6 Paradox
  {
    color: "amber",
    component: ({ active }) => (
      <Slide active={active} color="amber">
        <h2 className="slide-title text-gradient grad-amber stagger d-1">
          <i className="fa-solid fa-infinity"></i> The IPv4 vs IPv6 Paradox
        </h2>
        <div className="grid-2">
          <div className="glass-panel stagger d-2" style={{ borderColor: 'rgba(244, 63, 94, 0.4)' }}>
            <div><div className="concept-badge" style={{ color: 'var(--rose)' }}>1990s Band-Aid</div></div>
            <h3 style={{ color: 'var(--rose)', fontSize: '3rem' }}>NAT</h3>
            <p style={{ color: '#fff' }}>We ran out of the 4.3 billion IPs years ago.</p>
            <p>Network Address Translation let <strong>entire houses share 1 public IP</strong>, creating "Private IPs" (192.168.x.x).</p>
          </div>
          <div className="glass-panel stagger d-3" style={{ borderColor: 'rgba(16, 185, 129, 0.4)' }}>
            <div><div className="concept-badge" style={{ color: 'var(--emerald)' }}>The Modern Reality</div></div>
            <h3 style={{ color: 'var(--emerald)', fontSize: '3rem' }}>3.4 × 10³⁸ IPs</h3>
            <p style={{ color: '#fff' }}>Every device gets a globally routable public IP.</p>
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <h4 style={{ color: 'var(--amber)' }}>The Contradiction</h4>
              <p>Why do LANs still exist? For <strong>Security</strong> (Firewalls) and zero-cost local <strong>Switching</strong>.</p>
            </div>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 7: Riddle: The Connection Timeout
  {
    color: "rose",
    component: ({ active }) => (
      <Slide active={active} color="rose" alignCenter>
        <h2 className="slide-title text-gradient grad-rose stagger d-1" style={{ justifyContent: 'center' }}>
          <i className="fa-solid fa-puzzle-piece"></i> Riddle: The Connection Timeout
        </h2>
        <div className="glass-panel stagger d-2" style={{ maxWidth: '900px', padding: '4rem', borderTop: '4px solid var(--rose)' }}>
          <i className="fa-solid fa-cubes icon-massive" style={{ color: 'var(--rose)' }}></i>
          <h3 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '2rem' }}>The Dilemma</h3>
          <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            You just started a Minecraft server on your laptop. You text your friend to join. 
          </p>
          <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            You tell them: <strong>"My IP is <span className="mono text-gradient grad-rose">192.168.1.5</span>"</strong>
          </p>
          <p style={{ fontWeight: 'bold', marginTop: '3rem', fontSize: '2rem', color: '#fff' }}>
            They can't connect. Why?
          </p>
        </div>
      </Slide>
    )
  },
  // Slide 8: The Reveal: Private IP Illusion
  {
    color: "emerald",
    component: ({ active }) => (
      <Slide active={active} color="emerald" alignCenter>
        <h2 className="slide-title text-gradient grad-emerald stagger d-1" style={{ justifyContent: 'center' }}>
          <i className="fa-solid fa-house-lock"></i> The Reveal: Private IP Illusion
        </h2>
        <div className="glass-panel stagger d-2" style={{ maxWidth: '900px', padding: '4rem', borderTop: '4px solid var(--emerald)' }}>
          <h3 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '2rem' }}>It's a Local Address</h3>
          <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            <span className="mono">192.168.x.x</span> is a private IP generated by your router's NAT. It does not exist on the global internet.
          </p>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', border: '1px solid var(--emerald)', borderRadius: '8px', marginTop: '2rem' }}>
            <p style={{ color: 'var(--emerald)', fontWeight: 'bold', fontSize: '1.5rem', margin: 0 }}>
              Giving someone that IP is like telling the post office your address is "Bedroom 3".<br /><br />Which house? Which city?
            </p>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 9: Interfaces & Ports
  {
    color: "emerald",
    component: ({ active }) => (
      <Slide active={active} color="emerald">
        <h2 className="slide-title text-gradient grad-emerald stagger d-1">
          <i className="fa-solid fa-door-open"></i> Interfaces & Ports
        </h2>
        <div className="grid-2" style={{ alignItems: 'center' }}>
          <ul className="sleek-list stagger d-2">
            <li>
              <i className="fa-solid fa-building" style={{ color: 'var(--emerald)' }}></i>
              <strong>IP = The Building:</strong> Routes packet to the machine.
            </li>
            <li>
              <i className="fa-solid fa-door-closed" style={{ color: 'var(--amber)' }}></i>
              <strong>Port = The Apartment:</strong> Routes packet to the specific App.
            </li>
            <li>
              <i className="fa-solid fa-lock" style={{ color: 'var(--rose)' }}></i>
              <strong>127.0.0.1 (Localhost):</strong> App listens only to internal OS.
            </li>
            <li>
              <i className="fa-solid fa-globe" style={{ color: 'var(--cyan)' }}></i>
              <strong>0.0.0.0 (Any):</strong> App listens on ALL interfaces.
            </li>
          </ul>
          <div className="stagger d-3" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="glass-panel" style={{ width: '100%', textAlign: 'center', padding: '2rem 1rem' }}>
              <h3 style={{ fontFamily: '"JetBrains Mono"', color: 'var(--emerald)', marginBottom: '2rem' }}>
                192.168.1.50
              </h3>
              <div style={{ display: 'flex', justifyContent: 'space-around', gap: '1rem' }}>
                <div style={{ flex: 1, padding: '1.5rem 0', border: '2px solid rgba(255, 255, 255, 0.2)', borderBottom: 'none', borderRadius: '8px 8px 0 0', background: 'rgba(0, 0, 0, 0.5)' }}>
                  <h3 style={{ color: 'var(--cyan)', margin: 0 }}>80</h3>
                  <span className="mono" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Web</span>
                </div>
                <div style={{ flex: 1, padding: '1.5rem 0', border: '2px solid rgba(255, 255, 255, 0.2)', borderBottom: 'none', borderRadius: '8px 8px 0 0', background: 'rgba(0, 0, 0, 0.5)' }}>
                  <h3 style={{ color: 'var(--rose)', margin: 0 }}>22</h3>
                  <span className="mono" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>SSH</span>
                </div>
                <div style={{ flex: 1, padding: '1.5rem 0', border: '2px solid rgba(255, 255, 255, 0.2)', borderBottom: 'none', borderRadius: '8px 8px 0 0', background: 'rgba(0, 0, 0, 0.5)' }}>
                  <h3 style={{ color: 'var(--amber)', margin: 0 }}>25565</h3>
                  <span className="mono" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>MC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 10: The ISP Trap
  {
    color: "rose",
    component: ({ active }) => (
      <Slide active={active} color="rose">
        <h2 className="slide-title text-gradient grad-rose stagger d-1">
          <i className="fa-solid fa-box-archive"></i> The ISP Trap: CGNAT
        </h2>
        <div className="grid-2">
          <div className="glass-panel stagger d-2" style={{ borderColor: 'rgba(244, 63, 94, 0.4)' }}>
            <h3>Carrier-Grade NAT</h3>
            <p>ISPs hoard public IPs, placing you behind <em>another</em> giant router.</p>
            <div style={{ margin: '1.5rem 0', padding: '1rem', border: '2px dashed var(--rose)', borderRadius: '12px', textAlign: 'center' }}>
              <div className="mono" style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '1rem' }}>ISP Router (142.x.x.x)</div>
              <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', border: '2px dashed var(--amber)', borderRadius: '8px' }}>
                <div className="mono" style={{ color: 'var(--amber)', marginBottom: '0.5rem', fontSize: '1rem' }}>Home Router (100.64.x.x)</div>
                <div style={{ padding: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', border: '2px dashed var(--emerald)', borderRadius: '6px' }}>
                  <div className="mono" style={{ color: 'var(--emerald)', fontSize: '1rem' }}>Your PC (192.168.1)</div>
                </div>
              </div>
            </div>
            <h4 style={{ color: 'var(--rose)', textAlign: 'center' }}>Result: Port Forwarding is Dead.</h4>
          </div>
          <div className="flex-col-gap">
            <div className="glass-panel stagger d-3">
              <h3 style={{ color: 'var(--cyan)' }}>
                <i className="fa-solid fa-ban"></i> College Constraints
              </h3>
              <p>Our Wi-Fi uses <strong>Client Isolation</strong>. You can't ping the laptop next to you. Inbound blocked.</p>
            </div>
            <div className="glass-panel stagger d-4">
              <h3 style={{ color: 'var(--purple)' }}>
                <i className="fa-solid fa-arrow-rotate-left"></i> Hairpin NAT Crash
              </h3>
              <p>Connecting to your own public IP from inside? Cheap routers drop the packet.</p>
            </div>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 11: Censorship & DPI
  {
    color: "cyan",
    component: ({ active }) => (
      <Slide active={active} color="cyan">
        <h2 className="slide-title text-gradient grad-cyan stagger d-1">
          <i className="fa-solid fa-gavel"></i> Censorship & DPI
        </h2>
        <p className="stagger d-2" style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '2rem' }}>
          How does an ISP enforce an app ban?
        </p>

        <div className="flex-col-gap">
          <div className="glass-panel stagger d-3" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2rem' }}>
            <h1 className="num-massive" style={{ color: 'var(--purple)' }}>1</h1>
            <div>
              <h3 style={{ color: '#fff', marginBottom: '0.25rem' }}>DNS Spoofing</h3>
              <p style={{ margin: 0 }}>You ask for <span className="mono text-gradient grad-purple">telegram.org</span>. ISP returns <span className="mono">0.0.0.0</span>.</p>
            </div>
          </div>

          <div className="glass-panel stagger d-4" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2rem' }}>
            <h1 className="num-massive" style={{ color: 'var(--rose)' }}>2</h1>
            <div>
              <h3 style={{ color: '#fff', marginBottom: '0.25rem' }}>SNI Filtering (DPI)</h3>
              <p style={{ margin: 0 }}>Firewall reads plain text "Server Name", and injects a <strong>TCP RST</strong> packet to kill it.</p>
            </div>
          </div>

          <div className="glass-panel stagger d-5" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2rem' }}>
            <h1 className="num-massive" style={{ color: 'var(--amber)' }}>3</h1>
            <div>
              <h3 style={{ color: '#fff', marginBottom: '0.25rem' }}>BGP Blackholing</h3>
              <p style={{ margin: 0 }}>ISPs advertise false routes for IPs, dropping traffic into a void.</p>
            </div>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 12: LIVE LAB: HTTP Tunnel
  {
    color: "cyan",
    component: ({ active }) => (
      <Slide active={active} color="cyan">
        <h2 className="slide-title text-gradient grad-cyan stagger d-1">
          <i className="fa-solid fa-terminal"></i> LIVE LAB: Web Server Bypass
        </h2>
        <p className="stagger d-2" style={{ textAlign: 'center', color: '#fff', fontSize: '1.8rem', marginBottom: '2rem' }}>
          Since inbound is blocked, we punch a hole <strong>OUT</strong>.
        </p>
        <Terminal active={active} cmd="python3 -m http.server 8080" staggerClass="stagger d-3">
          <div style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Serving HTTP on 0.0.0.0 port 8080 ...</div>
          <div className="cmd">cloudflared tunnel --url http://localhost:8080</div>
          <div style={{ color: 'var(--text-muted)' }}>2026-09-02T19:05:16Z INF Requesting new quick Tunnel...</div>
          <div style={{ color: 'var(--text-muted)' }}>+---------------------------------------------------+</div>
          <div style={{ color: 'var(--text-muted)' }}>
            |<span className="hl-cyan" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>https://random-words.trycloudflare.com</span>|
          </div>
          <div style={{ color: 'var(--text-muted)' }}>+---------------------------------------------------+</div>
        </Terminal>
        <div className="stagger d-4" style={{ textAlign: 'center', marginTop: '3rem' }}>
          <div className="glass-panel" style={{ display: 'inline-block', padding: '1rem 2rem', borderColor: 'var(--amber)' }}>
            <h3 style={{ color: 'var(--amber)', margin: 0 }}>
              <i className="fa-solid fa-mobile-screen"></i> Connect via 5G now!
            </h3>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 13: LIVE LAB: Minecraft Port Bypass
  {
    color: "emerald",
    component: ({ active }) => (
      <Slide active={active} color="emerald">
        <h2 className="slide-title text-gradient grad-emerald stagger d-1">
          <i className="fa-solid fa-cubes"></i> LIVE LAB: Minecraft Port Bypass
        </h2>
        <p className="stagger d-2" style={{ textAlign: 'center', color: '#fff', fontSize: '1.5rem', marginBottom: '2rem' }}>
          Bypassing CGNAT to host a TCP Game Server on Port 25565
        </p>

        <div className="grid-2">
          <Terminal active={active} cmd="java -jar purpur.jar" staggerClass="stagger d-3" fontSize="0.85rem">
            <div style={{ color: 'var(--text-muted)' }}>[Server thread/INFO]: Starting minecraft server version 1.20.4</div>
            <div style={{ color: 'var(--emerald)' }}>[Server thread/INFO]: Done (4.123s)! For help, type "help"</div>
            <div style={{ color: 'var(--rose)', marginTop: '1.5rem' }}>// Running locally on 0.0.0.0:25565</div>
            <div style={{ color: 'var(--rose)' }}>// Cannot be joined via Local IP on 5G.</div>
          </Terminal>

          <Terminal active={active} cmd="cloudflared tunnel --tcp localhost:25565" staggerClass="stagger d-4" fontSize="0.85rem">
            <div style={{ color: 'var(--text-muted)' }}>2026-09-02T19:05:16Z INF Requesting new TCP Tunnel...</div>
            <div style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>+-------------------------------------------+</div>
            <div style={{ color: 'var(--text-muted)' }}>
              |<span className="hl-cyan" style={{ fontWeight: 'bold', fontSize: '1rem' }}>mc.random-words.trycloudflare.com</span>|
            </div>
            <div style={{ color: 'var(--text-muted)' }}>+-------------------------------------------+</div>
            <div style={{ color: 'var(--emerald)', marginTop: '1.5rem', fontWeight: 'bold' }}>
              // Audience: Add this server address now!
            </div>
          </Terminal>
        </div>
      </Slide>
    )
  },
  // Slide 14: Network Quality Metrics
  {
    color: "purple",
    component: ({ active }) => (
      <Slide active={active} color="purple">
        <h2 className="slide-title text-gradient grad-purple stagger d-1">
          <i className="fa-solid fa-chart-line"></i> Network Quality Metrics
        </h2>
        <div className="grid-2">
          <ul className="sleek-list stagger d-2">
            <li>
              <i className="fa-solid fa-water" style={{ color: 'var(--cyan)' }}></i>
              <strong style={{ color: '#fff' }}>Bandwidth & Throughput:</strong> Highway width vs actual cars passing.
            </li>
            <li>
              <i className="fa-solid fa-stopwatch" style={{ color: 'var(--emerald)' }}></i>
              <strong style={{ color: '#fff' }}>Latency & Ping:</strong> The time it takes for 1 car to do a round trip.
            </li>
            <li>
              <i className="fa-solid fa-bolt" style={{ color: 'var(--amber)' }}></i>
              <strong style={{ color: '#fff' }}>Jitter:</strong> The variance/unpredictability in latency (Rubberbanding).
            </li>
            <li>
              <i className="fa-solid fa-box-open" style={{ color: 'var(--rose)' }}></i>
              <strong style={{ color: '#fff' }}>Packet Loss:</strong> Packets dropped by overloaded routers.
            </li>
          </ul>

          <div className="glass-panel stagger d-3" style={{ textAlign: 'center', borderColor: 'var(--purple)' }}>
            <h3 style={{ color: 'var(--purple)', fontSize: '2.5rem', marginBottom: '1rem' }}>
              <i className="fa-solid fa-stopwatch"></i> Activity Time
            </h3>
            <p style={{ color: '#fff', fontSize: '1.5rem' }}>Open <strong>fast.com</strong> on your phone.</p>
            <p>Click "Show more info". Look at your <strong>Loaded Latency (Bufferbloat)</strong>.<br />Compare College Wi-Fi vs your 5G Network.</p>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 15: Meme Break
  {
    color: "amber",
    component: ({ active }) => (
      <Slide active={active} color="amber" alignCenter>
        <h2 className="slide-title text-gradient grad-amber stagger d-1" style={{ justifyContent: 'center' }}>
          <i className="fa-solid fa-face-laugh-squint"></i> It's Always DNS.
        </h2>
        <div className="grid-2" style={{ width: '100%', maxWidth: '1200px' }}>
          <div className="glass-panel stagger d-2" style={{ padding: '3rem', textAlign: 'center', borderTop: '4px solid var(--rose)' }}>
            <i className="fa-solid fa-server icon-massive" style={{ color: 'var(--rose)' }}></i>
            <h3 style={{ color: '#fff', marginBottom: '1rem' }}>The Corporate Excuse:</h3>
            <h4 style={{ fontSize: '1.8rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.4 }}>
              "It was not a network issue. It was not a firewall issue. It was DNS."
            </h4>
            <p style={{ color: 'var(--rose)', fontWeight: 'bold', fontSize: '2rem', marginTop: '2rem' }}>
              It's ALWAYS DNS.
            </p>
          </div>
          <div className="glass-panel stagger d-3" style={{ padding: '3rem', textAlign: 'center', borderTop: '4px solid var(--emerald)' }}>
            <i className="fa-solid fa-masks-theater icon-massive" style={{ color: 'var(--emerald)' }}></i>
            <h3 style={{ color: '#fff', marginBottom: '1rem' }}>The Free VPN Reality:</h3>
            <h4 style={{ fontSize: '1.8rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.4 }}>
              "Jor jor se bolke sabko scheme bata de!"
            </h4>
            <p style={{ color: 'var(--emerald)', fontWeight: 'bold', fontSize: '1.5rem', marginTop: '2rem' }}>
              (When your free VPN leaks your unencrypted DNS requests directly to your ISP)
            </p>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 16: VPNs & Privacy
  {
    color: "rose",
    component: ({ active }) => (
      <Slide active={active} color="rose">
        <h2 className="slide-title text-gradient grad-rose stagger d-1">
          <i className="fa-solid fa-user-secret"></i> VPNs & The Privacy Paradox
        </h2>
        <div className="grid-2">
          <div className="flex-col-gap">
            <div className="glass-panel stagger d-2" style={{ borderLeft: '4px solid var(--cyan)' }}>
              <h3>WireGuard vs OpenVPN</h3>
              <p>
                <strong>OpenVPN:</strong> Old, user-space, heavy.<br />
                <strong>WireGuard:</strong> Next-gen, in-kernel, stealthy.
              </p>
            </div>
            <div className="glass-panel stagger d-3" style={{ borderLeft: '4px solid var(--rose)' }}>
              <h3>The Egress Risk</h3>
              <p>VPNs act as your new ISP. They see all DNS and TLS SNI metadata.</p>
            </div>
          </div>

          <div className="stagger d-4">
            <h3 style={{ color: '#fff' }}>
              <i className="fa-solid fa-spider" style={{ color: 'var(--purple)' }}></i> Web Tracking Escapes VPNs
            </h3>
            <p>Tracking relies on parameters, not just IP addresses.</p>
            <Terminal active={active}>
              <div style={{ color: '#fff' }}>GET /post/123 HTTP/3</div>
              <div style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>URL Parameters:</div>
              <div className="hl-amber">?utm_source=networking</div>
              <div className="hl-amber">?igsh=YzcxN2Q2NzE0...</div>
              <div style={{ color: 'var(--rose)', marginTop: '1rem' }}>// igsh maps social graphs regardless of IP.</div>
            </Terminal>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 17: Supply Chain & Attacks
  {
    color: "amber",
    component: ({ active }) => (
      <Slide active={active} color="amber">
        <h2 className="slide-title text-gradient grad-amber stagger d-1">
          <i className="fa-solid fa-skull-crossbones"></i> When The Network Attacks
        </h2>
        <div className="grid-3">
          <div className="glass-panel stagger d-2" style={{ borderTop: '4px solid var(--emerald)', textAlign: 'center' }}>
            <i className="fa-brands fa-linux icon-massive" style={{ color: 'var(--emerald)' }}></i>
            <h3 style={{ color: '#fff' }}>XZ-Utils Hack</h3>
            <div className="mono" style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>CVE-2024-3094</div>
            <p>A 4-line network backdoor injected into Linux SSH for remote access.</p>
          </div>

          <div className="glass-panel stagger d-3" style={{ borderTop: '4px solid var(--cyan)', textAlign: 'center' }}>
            <i className="fa-solid fa-box-open icon-massive" style={{ color: 'var(--cyan)' }}></i>
            <h3 style={{ color: '#fff' }}>AUR Typosquatting</h3>
            <div className="mono" style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>chrome-fix vs google-chrome</div>
            <p>Malicious packages relying on users blindly copying commands.</p>
          </div>

          <div className="glass-panel stagger d-4" style={{ borderTop: '4px solid var(--amber)', textAlign: 'center' }}>
            <i className="fa-solid fa-people-arrows icon-massive" style={{ color: 'var(--amber)' }}></i>
            <h3 style={{ color: '#fff' }}>ClickFix</h3>
            <div className="mono" style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>Social Engineering</div>
            <p>"Browser needs update, paste this in terminal." Bypasses firewalls entirely.</p>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 18: DDoS
  {
    color: "amber",
    component: ({ active }) => (
      <Slide active={active} color="amber">
        <h2 className="slide-title text-gradient grad-amber stagger d-1">
          <i className="fa-solid fa-burst"></i> Exploits: DoS vs DDoS
        </h2>
        <div className="grid-2">
          <div className="flex-col-gap">
            <div className="glass-panel stagger d-2" style={{ borderLeft: '4px solid var(--amber)' }}>
              <h3>Denial of Service (DoS)</h3>
              <p>A single machine sends malformed packets (like a SYN Flood) to crash a server's network stack. Easily blocked by IP rules.</p>
            </div>
            <div className="glass-panel stagger d-3" style={{ borderLeft: '4px solid var(--rose)' }}>
              <h3>Distributed (DDoS) & Botnets</h3>
              <p>100,000 infected IoT devices (smart fridges, cameras) coordinate to send valid traffic simultaneously. The server legitimately runs out of bandwidth.</p>
            </div>
          </div>
          <div className="stagger d-4">
            <h3 style={{ color: '#fff', marginBottom: '1rem' }}>The SYN Flood</h3>
            <Terminal active={active} cmd="hping3 -S --flood -V -p 80 target.com">
              <div style={{ color: 'var(--text-muted)' }}>HPING target.com (eth0 192.168.1.100): S set, 40 headers + 0 data bytes</div>
              <div style={{ color: 'var(--text-muted)' }}>hping in flood mode, no replies will be shown</div>
              <div style={{ color: 'var(--rose)', marginTop: '1rem' }}>// Sending SYN...</div>
              <div style={{ color: 'var(--rose)' }}>// Sending SYN...</div>
              <div style={{ color: 'var(--rose)' }}>// Server allocates memory waiting for ACKs that never come.</div>
            </Terminal>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 19: BGP
  {
    color: "cyan",
    component: ({ active }) => (
      <Slide active={active} color="cyan">
        <h2 className="slide-title text-gradient grad-cyan stagger d-1">
          <i className="fa-solid fa-project-diagram"></i> BGP & The Backbone
        </h2>
        <div className="grid-2">
          <div className="glass-panel stagger d-2" style={{ borderColor: 'var(--cyan)' }}>
            <h3 style={{ color: 'var(--cyan)', fontSize: '2.5rem' }}>Border Gateway Protocol</h3>
            <p style={{ color: '#fff' }}>The postal service of the internet.</p>
            <p>Routers don't know the entire internet. They only know their neighbors. BGP is how massive ISPs announce: <em>"I know the shortest path to YouTube's IPs!"</em></p>
          </div>
          <div className="flex-col-gap">
            <div className="glass-panel stagger d-3" style={{ borderLeft: '4px solid var(--amber)' }}>
              <h3 style={{ color: '#fff', marginBottom: '0.25rem' }}>BGP Hijacking</h3>
              <p style={{ margin: 0 }}>A rogue ISP falsely announces a shorter route, stealing traffic meant for another country.</p>
            </div>
            <div className="glass-panel stagger d-4" style={{ borderLeft: '4px solid var(--rose)' }}>
              <h3 style={{ color: '#fff', marginBottom: '0.25rem' }}>BGP Leak</h3>
              <p style={{ margin: 0 }}>Misconfigured routers accidentally advertise they can route all of Google's traffic, instantly causing a global outage.</p>
            </div>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 20: Rogue Appliance Riddle
  {
    color: "rose",
    component: ({ active }) => (
      <Slide active={active} color="rose" alignCenter>
        <h2 className="slide-title text-gradient grad-rose stagger d-1" style={{ justifyContent: 'center' }}>
          <i className="fa-solid fa-puzzle-piece"></i> Riddle: The Rogue Appliance
        </h2>
        <div className="glass-panel stagger d-2" style={{ maxWidth: '900px', padding: '4rem', borderTop: '4px solid var(--rose)' }}>
          <i className="fa-solid fa-tv icon-massive" style={{ color: 'var(--rose)' }}></i>
          <h3 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '2rem' }}>The Dilemma</h3>
          <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            You bought a Smart TV. It has no app store, and you <strong>cannot</strong> install an adblocker on it. 
            However, it is secretly sending your viewing habits to <span className="mono text-gradient grad-rose">trackers.smart-tv.com</span> every 5 seconds.
          </p>
          <p style={{ fontWeight: 'bold', marginTop: '3rem', fontSize: '2rem', color: '#fff' }}>
            Based on everything we've covered... how do you stop it?
          </p>
        </div>
      </Slide>
    )
  },
  // Slide 21: Pi-hole Reveal
  {
    color: "emerald",
    component: ({ active }) => (
      <Slide active={active} color="emerald">
        <h2 className="slide-title text-gradient grad-emerald stagger d-1">
          <i className="fa-solid fa-shield-halved"></i> The Reveal: DNS Sinkholing
        </h2>
        <div className="grid-2">
          <div className="flex-col-gap stagger d-2">
            <div className="glass-panel" style={{ borderTop: '4px solid var(--cyan)' }}>
              <h3 style={{ color: 'var(--cyan)' }}>Control the Network</h3>
              <p style={{ fontSize: '1.2rem', lineHeight: 1.6 }}>If you can't control the device, you control the infrastructure it relies on. By poisoning your own DNS using <strong>Pi-hole</strong> or <strong>AdGuard Home</strong>, you can blind any device on your Wi-Fi.</p>
            </div>
            <Terminal active={active} cmd="nslookup trackers.smart-tv.com" staggerClass="stagger d-3" fontSize="1.1rem">
              <div style={{ color: 'var(--text-muted)' }}>Server:     192.168.1.2 (Pi-hole)</div>
              <br />
              <div style={{ color: 'var(--emerald)', fontWeight: 'bold' }}>Name:       trackers.smart-tv.com</div>
              <div style={{ color: 'var(--rose)', fontWeight: 'bold' }}>Address:    0.0.0.0</div>
            </Terminal>
          </div>
          <div className="flex-col-gap stagger d-4">
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', borderColor: 'var(--purple)', height: '100%' }}>
              <i className="fa-solid fa-tv" style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '1rem' }}></i>
              <p className="mono" style={{ margin: 0, color: '#fff', fontSize: '1.2rem' }}>"Where is trackers.com?"</p>
              <i className="fa-solid fa-arrow-down" style={{ fontSize: '2rem', color: 'var(--text-muted)', margin: '1rem 0' }}></i>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', border: '1px solid var(--emerald)', borderRadius: '8px' }}>
                <i className="fa-solid fa-server" style={{ fontSize: '3rem', color: 'var(--emerald)', marginBottom: '1rem' }}></i>
                <p className="mono" style={{ color: 'var(--emerald)', fontWeight: 'bold', margin: 0, fontSize: '1.5rem' }}>Pi-hole (192.168.1.2)</p>
              </div>
              <i className="fa-solid fa-arrow-down" style={{ fontSize: '2rem', color: 'var(--text-muted)', margin: '1rem 0' }}></i>
              <p className="mono" style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--rose)' }}>0.0.0.0 (Nowhere)</p>
            </div>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 22: Cryptography: TLS & Certificates (Moved to before the end)
  {
    color: "cyan",
    component: ({ active }) => (
      <Slide active={active} color="cyan">
        <h2 className="slide-title text-gradient grad-cyan stagger d-1">
          <i className="fa-solid fa-lock"></i> Cryptography: TLS & Certificates
        </h2>
        <div className="grid-2">
          <div className="flex-col-gap stagger d-2">
            <div className="glass-panel" style={{ borderLeft: '4px solid var(--emerald)' }}>
              <h3 style={{ color: 'var(--emerald)' }}>HTTPS & TLS</h3>
              <p>
                <strong>Asymmetric Encryption:</strong> The server gives you a Public Key to lock data. Only the server holds the Private Key to unlock it.
              </p>
            </div>
            <div className="glass-panel" style={{ borderLeft: '4px solid var(--cyan)' }}>
              <h3 style={{ color: 'var(--cyan)' }}>HSTS (Strict Transport Security)</h3>
              <p>
                A header telling your browser: <em>"Never talk to me over unencrypted HTTP again."</em> Prevents hackers from silently downgrading your connection on public Wi-Fi.
              </p>
            </div>
          </div>
          
          <div className="glass-panel stagger d-3" style={{ borderColor: 'var(--purple)' }}>
            <h3 style={{ color: 'var(--purple)', fontSize: '2rem' }}>Certificate Authorities</h3>
            <p>How do you know the Public Key actually belongs to Google, and not a hacker intercepting your traffic?</p>
            <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--purple)', marginTop: '1.5rem' }}>
              <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}><i className="fa-solid fa-stamp" style={{ color: 'var(--amber)' }}></i> The Root of Trust</h4>
              <p style={{ margin: 0 }}>
                Your OS is pre-installed with root certificates from trusted authorities (like <strong>Let's Encrypt</strong>). These CAs verify domains and cryptographically sign their keys.
              </p>
            </div>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 23: TOR & P2P (EXPANDED)
  {
    color: "purple",
    component: ({ active }) => (
      <Slide active={active} color="purple">
        <h2 className="slide-title text-gradient grad-purple stagger d-1">
          <i className="fa-solid fa-masks-theater"></i> The Underground: TOR & P2P
        </h2>
        <div className="grid-2">
          <div className="stagger d-2">
            <h3 style={{ color: 'var(--cyan)', fontSize: '2.5rem' }}>TOR (The Onion Router)</h3>
            <p>Your traffic is bounced through 3 random volunteer nodes globally. Each node only peels one layer of encryption.</p>
            <div className="flex-col-gap" style={{ marginTop: '2rem' }}>
              <div className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderLeft: '4px solid var(--rose)' }}>
                <strong className="mono" style={{ fontSize: '1.1rem' }}>1. Entry Guard</strong>
                <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Knows YOU, but not Destination.</span>
              </div>
              <div className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderLeft: '4px solid var(--amber)' }}>
                <strong className="mono" style={{ fontSize: '1.1rem' }}>2. Middle Relay</strong>
                <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Knows nothing (only sees encrypted blob).</span>
              </div>
              <div className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderLeft: '4px solid var(--emerald)' }}>
                <strong className="mono" style={{ fontSize: '1.1rem' }}>3. Exit Node</strong>
                <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Knows Destination, but not YOU.</span>
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--rose)', fontStyle: 'italic' }}>*Warning: Exit nodes can see unencrypted HTTP traffic. Always use HTTPS.</p>
            </div>
          </div>
          
          <div className="stagger d-3">
            <h3 style={{ color: 'var(--emerald)', fontSize: '2.5rem' }}>Torrents (P2P DHT)</h3>
            <div className="glass-panel" style={{ borderTop: '4px solid var(--emerald)' }}>
              <h4 style={{ color: '#fff', fontSize: '1.3rem' }}>Decentralized Swarm</h4>
              <p>Instead of downloading a 10GB file from a single server (which can be shut down), you download thousands of tiny chunks from 50 strangers globally simultaneously. It is mathematically unkillable.</p>
              <h4 style={{ color: 'var(--amber)', marginTop: '1.5rem', fontSize: '1.3rem' }}>Kademlia DHT</h4>
              <p style={{ margin: 0 }}>Distributed hash tables (using an XOR metric distance algorithm) allow nodes to discover peers mathematically without a central tracking server.</p>
            </div>
          </div>
        </div>
      </Slide>
    )
  },
  // Slide 24: Final 200 OK
  {
    color: "emerald",
    component: ({ active, onTerminate }) => (
      <Slide active={active} color="emerald" alignCenter>
        <div className="stagger d-1" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <i className="fa-solid fa-server icon-massive" style={{ color: 'var(--emerald)' }}></i>
        </div>
        <h1 className="title-massive text-gradient grad-emerald stagger d-2" style={{ fontFamily: '"JetBrains Mono"', fontSize: '6rem' }}>
          <DecryptedText key={active ? 'active' : 'inactive'} playAudio={active} text="HTTP 200 OK" animateOn="view" speed={40} maxIterations={4} sequential={true} />
        </h1>
        <p className="stagger d-3" style={{ color: 'var(--text-main)', maxWidth: '900px', fontSize: '1.5rem', marginTop: '2rem' }}>
          The connection is established. You now understand what happens under the hood.
        </p>
        <div className="stagger d-4" style={{ marginTop: '3rem' }}>
          <button
            onClick={onTerminate}
            className="glass-panel"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '1rem 3rem', color: 'var(--rose)',
              borderColor: 'rgba(244, 63, 94, 0.4)',
              background: 'rgba(244, 63, 94, 0.08)',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '1rem', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <i className="fa-solid fa-power-off"></i> Terminate Session
          </button>
        </div>
      </Slide>
    )
  }
];
