all_usernames = ["slgutier", "saulmart", "jonmora", "jsexton", "padyer", "niscelli", "bikelner",
                 "sjl1", "thaobui", "chenyenc", "ykien", "zz13", "cdheadle", "aldmetzg", "almira", "aeroe"]

for user in all_usernames:
    print("\n-------------------")
    print("Username: ", user)
    print(
        f"mysql --host=db.luddy.indiana.edu --user=i494f21_{user} --password=my+sql=i494f21_{user} i494f21_{user}")
