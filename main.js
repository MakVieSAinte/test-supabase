 
  import { createClient } from 'supabase-js'


  const supabaseUrl = 'juvonyzgfkhxyidadlzt' // à remplacer
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1dm9ueXpnZmtoeHlpZGFkbHp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0NTEzNzQsImV4cCI6MjA2NjAyNzM3NH0.JCPPbEkOXQkIXg1aaK5dxYgE1SJqdzbXMmkhEw1Ca1M' // à remplacer

  const supabase = createClient(supabaseUrl, supabaseKey)

  const form = document.querySelector('#contact-form')
  const list = document.querySelector('#contact-list')

  async function fetchContacts() {
    const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false })
    list.innerHTML = ''
    data.forEach(({ prenom, nom }) => {
      const li = document.createElement('li')
      li.textContent = `${prenom} ${nom}`
      list.appendChild(li)
    })
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const prenom = form.prenom.value
    const nom = form.nom.value

    await supabase.from('contacts').insert([{ prenom, nom }])
    form.reset()
    fetchContacts()
  })

  fetchContacts()
