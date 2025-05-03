
using System.Text;
using Hangfire;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace TaskManagementWebApp
{
    public class Program
    {








        //------------------------------------------------------------------------------------------
        // to connect frontend to backend
        public static void ConfigureCors(CorsOptions options)
        {
            options.AddPolicy("AllowAngularApp", ConfigureCorsPolicy);
        }

        public  static void ConfigureCorsPolicy(CorsPolicyBuilder policy)
        {
            policy.WithOrigins("http://localhost:4200"); //angular run on port no 4200 so this is angular origins url
            policy.AllowAnyMethod(); // allow all http methods request such as get,post,put,patch,delete
            policy.AllowAnyHeader();  // allow http header to be sent with any request
        }
        //---------------------------------------------------------------------------------------







        private static string key = "kSWSd1ZE4g4SrqGe89nmogPiS0CYpvh7";



        //-------------------------------------------------------------------------------------------------
        // kSWSd1ZE4g4SrqGe89nmogPiS0CYpvh7   //  // Configure JWT Authentication


        public static void ConfigureJwtAuthentication(IServiceCollection service)

        {


            service.AddAuthentication(GetAuthenticationOptions).AddJwtBearer(GetJwtBearerOptions);


        }


        private static void GetAuthenticationOptions(AuthenticationOptions options)
        {

            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;


        }



        private static void GetJwtBearerOptions(JwtBearerOptions  options)
        {
            options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
            {


                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                ClockSkew = TimeSpan.Zero




            };

        }




        //-------------------------------------------------------------------------------------------------

























        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            //-------------------------------------------------------------------------------------------------
            // string key  kSWSd1ZE4g4SrqGe89nmogPiS0CYpvh7

           




            //-------------------------------------------------------------------------------------------------








            // Add services to the container.

            builder.Services.AddControllers();

        //------------------------------------------------------------------
        builder.Services.AddCors(ConfigureCors);      // to connect frontend to backend
       //------------------------------------------------------------------
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();









            //-------------------------------------------------------------------------------------------
            ConfigureJwtAuthentication(builder.Services);    // Configure JWT Authentication
                                                             //------------------------------------------------------------------------------------------------


            //-----------------------------------------------------------------------------------------------


            // ? Hangfire service setup
            builder.Services.AddHangfire(config =>
                config.UseSqlServerStorage(builder.Configuration.GetConnectionString("DefaultConnection"))); // make sure your appsettings.json has this
            builder.Services.AddHangfireServer();
            //------------------------------------------------------------------------------------------------







            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            //------------------------------------
            app.UseCors("AllowAngularApp"); // to connect frontend to backend
            //-------------------------------------
            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            //------------------------------------------------------
            app.UseHangfireDashboard(); // Hangfire dashboard view at http://localhost:yourport/hangfire
            //-----------------------------------------------------



            app.Run();
        }
    }
}
