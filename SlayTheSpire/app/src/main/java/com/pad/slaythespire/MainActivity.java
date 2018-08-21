package com.pad.slaythespire;

import android.app.Fragment;
import android.app.FragmentTransaction;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity{


    private BottomNavigationView mainNav;
    private FrameLayout mainLayout;

    private HomeFragment homeFragment;
    private FriendFragment friendFragment;
    private ShopFragment shopFragment;
    private CardFragment cardFragment;
    private OptionFragment optionFragment;

    //private SectionsPagerAdapter mSectionsPagerAdapter;

    private ViewPager viewPager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mainLayout = (FrameLayout) findViewById(R.id.frameLayout);
        mainNav = (BottomNavigationView) findViewById(R.id.nav_bar);

        homeFragment = new HomeFragment();
        friendFragment = new FriendFragment();
        shopFragment = new ShopFragment();
        cardFragment = new CardFragment();
        optionFragment = new OptionFragment();

        mainNav.setSelectedItemId(R.id.nav_home);
        getSupportFragmentManager().beginTransaction().replace(R.id.main_layout, this.homeFragment).commit();



        /*mSectionsPagerAdapter = new SectionsPagerAdapter(getSupportFragmentManager());


        // Set up the ViewPager with the sections adapter.
        viewPager = findViewById(R.id.container);
        viewPager.setAdapter(mSectionsPagerAdapter);*/

        mainNav.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch (item.getItemId()){
                    case R.id.nav_cards:
                        getSupportFragmentManager().beginTransaction().replace(R.id.main_layout, cardFragment).commit();
                        break;
                    case R.id.nav_friends:
                        getSupportFragmentManager().beginTransaction().replace(R.id.main_layout, friendFragment).commit();
                        break;
                    case R.id.nav_home:
                        getSupportFragmentManager().beginTransaction().replace(R.id.main_layout, homeFragment).commit();
                        break;
                    case R.id.nav_help:
                        getSupportFragmentManager().beginTransaction().replace(R.id.main_layout, optionFragment).commit();
                        break;
                    case R.id.nav_shop:
                        getSupportFragmentManager().beginTransaction().replace(R.id.main_layout, shopFragment).commit();
                        break;
                    default: return false;
                }
                return true;
            }

        });

    }








    /*@Override
    public boolean onCreateOptionsMenu(Menu menu) {
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        switch (item.getItemId()){
            case R.id.nav_cards:
                getSupportFragmentManager().beginTransaction().replace(R.id.main_layout, cardFragment).commit();
                break;
            case R.id.nav_friends:
                getSupportFragmentManager().beginTransaction().replace(R.id.main_layout, friendFragment).commit();
                break;
            case R.id.nav_home:
                getSupportFragmentManager().beginTransaction().replace(R.id.main_layout, homeFragment).commit();
                break;
            case R.id.nav_options:
                getSupportFragmentManager().beginTransaction().replace(R.id.main_layout, optionFragment).commit();
                break;
            case R.id.nav_shop:
                getSupportFragmentManager().beginTransaction().replace(R.id.main_layout, shopFragment).commit();
                break;
            default: return false;
        }
        return super.onOptionsItemSelected(item);
    }


    public static class PlaceholderFragment extends android.support.v4.app.Fragment {

        private static final String ARG_SECTION_NUMBER = "section_number";

        public PlaceholderFragment() {
        }


        public static android.support.v4.app.Fragment newInstance(int sectionNumber) {
            android.support.v4.app.Fragment fragment = null;
            switch(sectionNumber){
                case 1:
                    fragment = new CardFragment();
                    break;
                case 2:
                    fragment = new HomeFragment();
                    break;
                case 3:
                    fragment = new FriendFragment();
                    break;
                case 4:
                    fragment = new OptionFragment();
                    break;
                case 5:
                    fragment = new ShopFragment();
                    break;
            }
            return fragment;
        }

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 Bundle savedInstanceState) {
            View rootView = inflater.inflate(R.layout.fragment_main, container, false);
            TextView textView = (TextView) rootView.findViewById(R.id.section_label);
            textView.setText(getString(R.string.section_format, getArguments().getInt(ARG_SECTION_NUMBER)));
            return rootView;
        }
    }


    public class SectionsPagerAdapter extends FragmentPagerAdapter {

        public SectionsPagerAdapter(FragmentManager fm) {
            super(fm);
        }

        @Override
        public android.support.v4.app.Fragment getItem(int position) {
            // getItem is called to instantiate the fragment for the given page.
            // Return a PlaceholderFragment (defined as a static inner class below).
            return LoginSignupActivity.PlaceholderFragment.newInstance(position + 1);
        }

        @Override
        public int getCount() {
            // Show 3 total pages.
            return 5;
        }
    }*/






}
